import RouteTargetReference from "./RouteTargetReference"

export default interface RouteSpec {
  host: string
  path:	string
  subdomain: string
  to: 	RouteTargetReference

}