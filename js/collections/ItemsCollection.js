import { Collection } from 'backbone'
import ItemModel from '../models/ItemModel'
import { LocalStorage } from 'backbone.localstorage'

class ItemsCollection extends Collection {

  get model() { return ItemModel }
  get localStorage() { return new LocalStorage('todos') }
  get comparator() { return 'order' }

  initialize() { }

  completed() { return this.where({ completed: true }) }
  active() { return this.where({ completed: false }) }

  order() { return this.length ? this.last().get('order') + 1 : 1 }

}

export default new ItemsCollection()