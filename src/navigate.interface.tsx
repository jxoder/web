import React from 'react'

type ItemActivateFn = (path: string) => (current: string) => boolean

export interface IHeaderMenuItem {
  name: string
  icon?: React.ElementType
  path: string
  activate: ItemActivateFn
}

export interface IContentCollapsibleMenuItem {
  type: 'group'
  name: string
  icon?: React.ElementType
  items: Array<{
    name: string
    path: string
    activate: ItemActivateFn
  }>
}

export interface IContentMenuItem {
  type: 'single'
  name: string
  icon?: React.ElementType
  path: string
  activate: ItemActivateFn
}

export interface IProjectNavConfig {
  name: string
  label?: string
  icon: React.ElementType
  path: string
  headers: Array<IHeaderMenuItem>
  contents: Array<IContentCollapsibleMenuItem | IContentMenuItem>
}
