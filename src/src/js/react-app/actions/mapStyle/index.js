import {
  MAP_STYLE
} from '../types';

export function toggleMapStyle(style) {
  return {
    type: MAP_STYLE,
    payload: style
  }
}