export type loadersDisplayType = {
  'type': loaderType,
  'color': string,
  'height': string,
  'width': string,
};

export enum loaderType {
  WATCH = 'Watch',
  AUDIO = 'Audio',
  BALLTRIANGLE = 'BallTriangle',
  BARS = 'Bars',
  CIRCLES = 'Circles',
  GRID = 'Grid',
  HEARTS = 'Hearts',
  OVAL = 'Oval',
  PUFF = 'Puff',
  RINGS = 'Rings',
  TAILSPIN = 'TailSpin',
  THREEDOTS = 'ThreeDots',
  REVOLVINGDOT = 'RevolvingDot',
  TRIANGLE = 'Triangle',
  PLANE = 'Plane',
  MULTATINGDOTS = 'MutatingDots',
  CRADLELOADER = 'CradleLoader',
}
