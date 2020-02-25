import { FETCH_SCORE_DETAIL, UPDATE_SCORE_DETAIL, UPDATE_ROUTE_DETAIL } from "./constants";

export const fetchScoreDetail = scoreDetail => ({
    type: FETCH_SCORE_DETAIL,
    val: scoreDetail
});

export const updateScoreDetail = scoreDetail => ({
    type: UPDATE_SCORE_DETAIL,
    val: scoreDetail
});

export const updateRouteDetail = routeDetail => ({
    type: UPDATE_ROUTE_DETAIL,
    val: routeDetail
});