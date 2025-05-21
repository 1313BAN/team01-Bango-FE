/*
    TypeScirpt가 .vue 모듈을 인식 시키기 위함
*/
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
