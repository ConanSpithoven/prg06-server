export function LinkAdder(results){
    for (var result of results){
      result['_links'] = {'self' : {'href' : '/bosses/' + result._id}};
    }
    return results;
}
  
export function ListDataBuilder(results, count = 0, start = 0, limit = 0) {
    results = LinkAdder(results);
    let data = {
        'items' : results,
        '_links' : {'self' : {'href' : '/bosses'}},
        'pagination' : {'temp' : 'balls', 'total' : count, 'start' : start, 'limit' : limit}
    };
    return data;
}
  
export function IDDataBuilder(result) {
    let data = {
        'item' : result,
        '_links' : {'self' : {'href' : '/bosses/' + result._id}, 'collection' : {'href' : '/bosses'}},
    };
    return data;
}