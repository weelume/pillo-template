/** 对照参考页的滚动舞台：功能区保留每幕之间的过渡，价格在后半程才分开。 */
export const motionScene = {
  featureScreens: ['alarm', 'tracking', 'routine'],
  phoneStops: [0, 0.12, 0.42, 0.73, 1],
  pricingStops: [0, 0.2, 0.6, 1],
  pricingSpread: [1, 1, 0.94, 0],
} as const

export function phoneScreenAt(progress: number): 'welcome' | 'alarm' | 'tracking' | 'routine' {
  if (progress < motionScene.phoneStops[1]) return 'welcome'
  if (progress < motionScene.phoneStops[2]) return 'alarm'
  if (progress < motionScene.phoneStops[3]) return 'tracking'
  return 'routine'
}
