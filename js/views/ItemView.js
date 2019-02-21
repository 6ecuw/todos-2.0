import _ from 'underscore'
import { View } from 'backbone'
import ItemTemplate from '../../templates/ItemTemplate.html'

class ItemView extends View {

    get tagName() { return 'li' }
    get className() { return 'item' }
    get template() {
        return _.template(ItemTemplate)
    }

    get events() {
        return {

        }
    }

    initialize() {
        this.listenTo(this.model, 'change', this.render)
        this.listenTo(this.model, 'destroy', this.remove)
    }

    render() {
        this.$el.html(this.template(this.model.toJSON()))
        this.$el.toggleClass('completed', this.model.get('completed'))
    }
}