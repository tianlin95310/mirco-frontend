import randomColor from './randomColor.ts'
export default {
  install(app: any, options: any) {
    return app.directive('randomColor', randomColor)
  }
}
