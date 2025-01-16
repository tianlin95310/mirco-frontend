import randomColor from './randomColor.ts'
export default {
  install(app: any){
    return app.directive('randomColor', randomColor)
  }
}
