import { Model } from 'backbone'

export default class ItemModel extends Model {

  get defaults() {
    return {
      title: '',
      completed: false
    }
  }

  initialize() {
    console.log(`Item Init! Title: ${this.get('title')}`)
  }

  toggle() {
    this.save({ completed: !this.get('completed') })
  }
}