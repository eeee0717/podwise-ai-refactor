export enum SearchState {
  Start = 'Start',
  Loading = 'Loading',
  Error = 'Error',
  Success = 'Success',
}

// icon 映射字典
export const stateIconMap: Record<SearchState, { icon: string, color: string }> = {
  [SearchState.Start]: { icon: 'i-lucide-arrow-right', color: 'gray' },
  [SearchState.Loading]: { icon: 'i-svg-spinners-180-ring-with-bg', color: 'gray' },
  [SearchState.Error]: { icon: 'i-carbon-warning-alt', color: 'red' },
  [SearchState.Success]: { icon: 'i-carbon-checkmark-outline', color: 'green' },
}

export enum TaskStatus {
  Waiting = 0,
  Processing = 1,
  Finish = 2,
  Failed = 3,
}
