import ObjectMeta from "./ObjectMeta"
import RouteSpec from "./RouteSpec"

export default interface Route {
  apiVersion: string
  kind: string
  metadata: ObjectMeta
  spec: RouteSpec
}