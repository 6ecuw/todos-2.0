import { Model } from 'backbone'

export default class ItemModel extends Model {
    
    get defaults() {
        return {
            title: '',
            completed: false
        }
    }

    initialize() {
        console.log(`Item created! Title: ${this.get('title')}`)
    }

    toggleCompleted() {
        this.save({ completed: !this.get('completed') })
    }
}