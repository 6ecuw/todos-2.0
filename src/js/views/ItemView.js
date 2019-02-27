import _ from 'underscore'
import { View } from 'backbone'
import ItemTemplate from '../../templates/ItemTemplate.html'

export default class ItemView extends View {

  get tagName() { return 'li' }
  get className() { return 'item' }
  get template() { return _.template(ItemTemplate) }

  get events() {
    return {
      'focus .item__label': 'edit',
      'click .item__box': 'toggleDone',
      'click button.item__delete': 'clear',
      'blur .item__label': 'close',
      'keypress .item__label': 'updateOnEnter',
      'keydown .item__label': 'cancelOnEscape'
    }
  }

  initialize() {
    // console.log('ItemView Init!');

    this.listenTo(this.model, 'destroy', this.remove)
  }

  render() {
    // console.log('Item render start!');

    this.$el.html(this.template(this.model.toJSON()))
    this.$el.toggleClass('done', this.model.get('done'))
    this.$input = this.$('.item__label')
    this.newItem = document.querySelector('.new-item')

    // console.log(`End Item render
    // ------------------------------------------------------------------------------------`);

    return this
  }


  toggleDone() {
    console.log('Toggle!');

    this.model.toggle()
  }

  toggleNewItem(stat) {
    if (getComputedStyle(this.newItem).position === 'fixed') {
      this.newItem.classList.toggle('visible-hidden', stat)
    }
  }

  edit() {
    console.log('Edit!');

    this.$el.addClass('editing')
    this.toggleNewItem(true)
  }

  clear() {
    console.log('Clear!');

    document.querySelector('[tabindex="-1"]').focus()
    this.model.destroy()
  }

  save(text) {
    console.log('Save!');

    this.model.save({ title: text })
  }

  close() {
    console.log('Close!');

    this.$el.removeClass('editing')

    this.toggleNewItem(false)

    let text = this.$input.text().trim()

    if (text === this.model.get('title')) return

    if (text) {
      this.save(text)
    } else {
      this.clear()
    }

  }

  updateOnEnter(e) {
    if (e.which === 13) {
      console.log('Enter');
      e.preventDefault()
      this.close()
      document.querySelector('.new-item__input').focus()
    }
  }

  cancelOnEscape(e) {
    if (e.which === 27) {
      console.log('Escape');
      this.$input.text(this.model.get('title'))
      this.close()
    }
  }
}