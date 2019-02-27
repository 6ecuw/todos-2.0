import { Model } from 'backbone'

export default class ItemModel extends Model {

  get defaults() {
    return {
      title: '',
      done: false
    }
  }

  initialize() {
    console.log(`Item Init! Title: ${this.get('title')}`)
  }

  toggle() {
    this.save({ done: !this.get('done') })
  }
}