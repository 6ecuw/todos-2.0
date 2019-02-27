import _ from 'underscore'
import { View } from 'backbone'
import Items from '../collections/ItemsCollection'
import ItemView from './ItemView'
import DoneTemplate from '../../templates/DoneTemplate.html'
import ActiveTemplate from '../../templates/ActiveTemplate.html'

export default class AppView extends View {

  get el() { return '#app' }
  get doneTemplate() { return _.template(DoneTemplate) }
  get activeTemplate() { return _.template(ActiveTemplate) }

  get events() {
    return {
      'keypress .new-item': 'create',
      'click .new-item__btn': 'create',
      'click .active-list__btn': 'makeAllDone',
      'click .done-list__btn': 'deleteAllDone'
    }
  }

  initialize() {
    console.log('App Init!');

    Items.fetch({ reset: true })

    this.applyTemplate()
    this.$status = this.$('[role="status"]')

    this.listenTo(Items, 'add', this.add)
    this.listenTo(Items, 'remove', this.remove)
    this.listenTo(Items, 'sort', this.sort)
    this.listenTo(Items, 'change:done', this.change)

  }

  add(item) {
    console.log('Event add');
    
    this.feedback(item.attributes.title, 'Добавлено')
    this.render()
  }
  
  remove(item) {
    console.log('Event remove');

    this.feedback(item.attributes.title, 'Удалено')
    this.render()
  }

  sort() {
    console.log('Event sort');
    this.render()
  }

  change() {
    console.log('Event change');
    this.render()
  }

  render() {
    // console.log(`App render start!`);

    this.applyTemplate()

    return this
  }

  applyTemplate() {
    // console.log(`ApplyTemplate!`);

    this.done = Items.done().length
    this.active = Items.active().length

    // console.log(this.active, this.done);

    this.$('.active-list').html(this.activeTemplate({ active: this.active }))
    this.$('.done-list').html(this.doneTemplate({ done: this.done }))

    this.$listActive = this.$('.active-list__items')
    this.$listDone = this.$('.done-list__items')
    this.$input = this.$('.new-item__input')

    this.addAll()
  }

  create(e) {
    if (e.which === 13 || e.type === 'click') {
      e.preventDefault()

      let text = this.$input.text();

      if (text) {
        Items.create({
          title: text,
          order: Items.order()
        });
      }

      this.$input.text('').focus()
    }
  }

  addOne(todo) {
    console.log(`addOne! Title: ${todo.get('title')}, Done: ${todo.get('done')}`);

    let view = new ItemView({ model: todo })
    let item = view.render().el
    // console.log(item);

    if (todo.get('done')) {
      // console.log(this.$listDone[0]);

      this.$listDone.append(item)

      // console.log(`ListDone children length: ${this.$listDone.children().length}
            // ------------------------------------------------------------------------------------`);
    } else {
      // console.log(this.$listActive[0]);

      this.$listActive.append(item)

      // console.log(`ListActive children length: ${this.$listActive.children().length}
            // ------------------------------------------------------------------------------------`);
    }
  }

  addAll() {
    // console.log(`addAll! Items length: ${Items.length}
        // ------------------------------------------------------------------------------------`);

    this.$listActive.html('')
    this.$listDone.html('')
    Items.each(this.addOne, this)
  }

  makeAllDone() {
    _.invoke(Items.active(), 'toggle')
  }

  deleteAllDone() {
    _.invoke(Items.done(), 'destroy')
    this.feedback('все выполненные пункты', 'Удалены')
  }

  feedback(title, status) {
    let liveRegion = document.querySelector('[role="status"]');
    liveRegion.textContent = `${status} ${title}`;
  }
}