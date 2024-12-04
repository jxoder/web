import React from 'react'

type ItemActivateFn = (current: string) => boolean

export interface IHeaderMenuItem {
  name: string
  icon?: React.ElementType
  path: string
  activate: ItemActivateFn
}

export interface IContentGroupMenuItem {
  name: string
  icon?: React.ElementType
  items: Array<{
    name: string
    path: string
    activate: ItemActivateFn
  }>
}

export interface IContentMenuItem {
  name: string
  icon?: React.ElementType
  path: string
  activate: ItemActivateFn
}

export interface IProjectNavConfig {
  name: string
  label?: string
  icon?: React.ElementType
  path: string
  headers?: Array<IHeaderMenuItem>
  contents?: Array<IContentGroupMenuItem | IContentMenuItem>
}
