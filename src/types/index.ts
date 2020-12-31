export type Activity = {
  id: string
  title: string
  description: string
  visibility: ActivityVisibility
  state: ActivityState
}

export enum ActivityVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum ActivityState {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
}
