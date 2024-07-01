export enum SearchState {
  Idle = 'Idle',
  Loading = 'Loading',
  Error = 'Error',
  Success = 'Success',
}

// icon 映射字典
export const SearchIconDict: Record<SearchState, { icon: string, color: string }> = {
  [SearchState.Idle]: { icon: '', color: 'gray' },
  [SearchState.Loading]: { icon: 'i-svg-spinners-180-ring-with-bg', color: 'gray' },
  [SearchState.Error]: { icon: 'i-carbon-warning-alt', color: 'red' },
  [SearchState.Success]: { icon: 'i-carbon-checkmark-outline', color: 'green' },
}
