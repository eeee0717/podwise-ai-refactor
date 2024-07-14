export enum State {
  Idle = 'Idle',
  Loading = 'Loading',
  Error = 'Error',
  Success = 'Success',
}

// icon 映射字典
export const stateIconMap: Record<State, { icon: string, color: string }> = {
  [State.Idle]: { icon: '', color: 'gray' },
  [State.Loading]: { icon: 'i-svg-spinners-180-ring-with-bg', color: 'gray' },
  [State.Error]: { icon: 'i-carbon-warning-alt', color: 'red' },
  [State.Success]: { icon: 'i-carbon-checkmark-outline', color: 'green' },
}
