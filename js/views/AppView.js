import _ from 'underscore'
import { View } from 'backbone'
import Items from '../collections/ItemsCollection'
import ItemView from './ItemView'
import CompletedTemplate from '../../templates/CompletedTemplate.html'
import ActiveTemplate from '../../templates/ActiveTemplate.html'

export default class AppView extends View {

  get el() { return '#app' }
  get completedTemplate() { return _.template(CompletedTemplate) }
  get activeTemplate() { return _.template(ActiveTemplate) }

  get events() {
    return {
      'keypress .new-item': 'createOnEnter',
      'click .new-item__btn': 'createOnEnter',
      'click .active-list__btn': 'makeAllComplete',
      'click .completed-list__btn': 'deleteAllCompleted'
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
    this.listenTo(Items, 'change:completed', this.change)

  }

  add() {
    console.log('Event add');
    this.render()
  }

  remove() {
    console.log('Event remove');
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

  render(event) {
    console.log(`App render start!`);

    this.applyTemplate()

    return this
  }

  applyTemplate() {
    console.log(`ApplyTemplate!`);

    this.completed = Items.completed().length
    this.active = Items.active().length

    console.log(this.active, this.completed);

    this.$sectionActive = this.$('.active-list')
    this.$sectionCompleted = this.$('.completed-list')

    this.$sectionActive.html(this.activeTemplate({ active: this.active }))
    this.$sectionCompleted.html(this.completedTemplate({ completed: this.completed }))

    this.$listActive = this.$('.active-list__items')
    this.$listCompleted = this.$('.completed-list__items')
    this.$input = this.$('.new-item__input')

    this.addAll()
  }

  createOnEnter(e) {   
    if (e.which === 13 || e.type === 'click') {
      e.preventDefault()

      let text = this.$input.text();

      if (text) {
        Items.create({
          title: text,
          order: Items.order()
        });
      }

      this.$input.text('')
    }
  }

  addOne(todo) {
    console.log(`addOne! Title: ${todo.get('title')}, Done: ${todo.get('completed')}`);

    let view = new ItemView({ model: todo })
    let item = view.render().el
    console.log(item);

    if (todo.get('completed')) {
      console.log(this.$listCompleted[0]);

      this.$listCompleted.append(item)

      console.log(`ListCompleted children length: ${this.$listCompleted.children().length}
            ------------------------------------------------------------------------------------`);
    } else {
      console.log(this.$listActive[0]);

      this.$listActive.append(item)

      console.log(`ListActive children length: ${this.$listActive.children().length}
            ------------------------------------------------------------------------------------`);
    }
  }

  addAll() {
    console.log(`addAll! Items length: ${Items.length}
        ------------------------------------------------------------------------------------`);

    this.$listActive.html('')
    this.$listCompleted.html('')
    Items.each(this.addOne, this)
  }

  makeAllComplete() {
    _.invoke(Items.active(), 'toggle')
  }
  
  deleteAllCompleted() {
    _.invoke(Items.completed(), 'destroy')
  }
}