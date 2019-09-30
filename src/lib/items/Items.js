import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Item from './Item'
// import ItemGroup from './ItemGroup'

import { _get, arraysEqual } from '../utility/generic'

const canResizeLeft = (item, canResize) => {
  const value =
    _get(item, 'canResize') !== undefined ? _get(item, 'canResize') : canResize
  return value === 'left' || value === 'both'
}

const canResizeRight = (item, canResize) => {
  const value =
    _get(item, 'canResize') !== undefined ? _get(item, 'canResize') : canResize
  return value === 'right' || value === 'both' || value === true
}

export default class Items extends Component {
  static propTypes = {
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,

    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,

    dragSnap: PropTypes.number,
    minResizeWidth: PropTypes.number,
    selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    canChangeGroup: PropTypes.bool.isRequired,
    canMove: PropTypes.bool.isRequired,
    canResize: PropTypes.oneOf([true, false, 'left', 'right', 'both']),
    canSelect: PropTypes.bool,

    keys: PropTypes.object.isRequired,

    moveResizeValidator: PropTypes.func,
    itemSelect: PropTypes.func,
    itemDrag: PropTypes.func,
    itemDrop: PropTypes.func,
    itemResizing: PropTypes.func,
    itemResized: PropTypes.func,

    onItemDoubleClick: PropTypes.func,
    onItemContextMenu: PropTypes.func,

    itemRenderer: PropTypes.func,
    selected: PropTypes.array,

    groupDimensions: PropTypes.object,
    useResizeHandle: PropTypes.bool,
    scrollRef: PropTypes.object,
    order: PropTypes.object,

    onDragStart: PropTypes.func.isRequired,
    onDragEnd: PropTypes.func.isRequired,
    onResizeStart:  PropTypes.func.isRequired,
    dragging: PropTypes.bool.isRequired,
    dragOffset: PropTypes.number.isRequired,
    interactingItemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    resizeEdge: PropTypes.oneOf(['right', 'left']),
    resizeTime: PropTypes.number
  }

  static defaultProps = {
    selected: []
  }

  shouldComponentUpdate(nextProps) {
    return !(
      arraysEqual(nextProps.items, this.props.items) &&
      nextProps.groupDimensions === this.props.groupDimensions &&
      nextProps.keys === this.props.keys &&
      nextProps.canvasTimeStart === this.props.canvasTimeStart &&
      nextProps.canvasTimeEnd === this.props.canvasTimeEnd &&
      nextProps.canvasWidth === this.props.canvasWidth &&
      nextProps.selectedItem === this.props.selectedItem &&
      nextProps.selected === this.props.selected &&
      nextProps.dragSnap === this.props.dragSnap &&
      nextProps.minResizeWidth === this.props.minResizeWidth &&
      nextProps.canChangeGroup === this.props.canChangeGroup &&
      nextProps.canMove === this.props.canMove &&
      nextProps.canResize === this.props.canResize &&
      nextProps.canSelect === this.props.canSelect &&
      nextProps.dragging === this.props.dragging &&
      nextProps.resizing === this.props.resizing &&
      nextProps.resizeEdge === this.props.resizeEdge &&
      nextProps.resizeTime === this.props.resizeTime &&
      nextProps.interactingItemId === this.props.interactingItemId
    )
  }

  isSelected(item, itemIdKey) {
    if (!this.props.selected) {
      return this.props.selectedItem === _get(item, itemIdKey)
    } else {
      let target = _get(item, itemIdKey)
      return this.props.selected.includes(target)
    }
  }

  isInteractingItem = (item) => {
    return this.props.interactingItemId === _get(item, this.props.keys.itemIdKey)
  }

  render() {
    const {
      keys,
      groupDimensions,
      order,
      items
    } = this.props
    const { itemIdKey } = keys

    return (
      <div className="rct-items">
        {items.map((item, i) => {
          const isInteractingItem = this.isInteractingItem(item)
          return (
          <Item
            key={_get(item, itemIdKey)}
            item={item}
            keys={this.props.keys}
            order={order}
            dimensions={groupDimensions.itemDimensions[i].dimensions}
            selected={this.isSelected(item, itemIdKey)}
            canChangeGroup={
              _get(item, 'canChangeGroup') !== undefined
                ? _get(item, 'canChangeGroup')
                : this.props.canChangeGroup
            }
            canMove={
              _get(item, 'canMove') !== undefined
                ? _get(item, 'canMove')
                : this.props.canMove
            }
            canResizeLeft={canResizeLeft(item, this.props.canResize)}
            canResizeRight={canResizeRight(item, this.props.canResize)}
            canSelect={
              _get(item, 'canSelect') !== undefined
                ? _get(item, 'canSelect')
                : this.props.canSelect
            }
            useResizeHandle={this.props.useResizeHandle}
            canvasTimeStart={this.props.canvasTimeStart}
            canvasTimeEnd={this.props.canvasTimeEnd}
            canvasWidth={this.props.canvasWidth}
            dragSnap={this.props.dragSnap}
            minResizeWidth={this.props.minResizeWidth}
            onResizing={this.props.itemResizing}
            onResized={this.props.itemResized}
            moveResizeValidator={this.props.moveResizeValidator}
            onDrag={this.props.itemDrag}
            onDrop={this.props.itemDrop}
            onItemDoubleClick={this.props.onItemDoubleClick}
            onContextMenu={this.props.onItemContextMenu}
            onSelect={this.props.itemSelect}
            itemRenderer={this.props.itemRenderer}
            scrollRef={this.props.scrollRef}
            dragging={isInteractingItem && this.props.dragging}
            resizing={isInteractingItem && this.props.resizing}
            dragOffset={isInteractingItem ? this.props.dragOffset: 0}
            resizeEdge={isInteractingItem ? this.props.resizeEdge: undefined}
            resizeTime={isInteractingItem ? this.props.resizeTime: 0}
            onDragStart={this.props.onDragStart}
            onDragEnd={this.props.onDragEnd}
            onResizeStart={this.props.onResizeStart}
          />
        )})}
      </div>
    )
  }
}
