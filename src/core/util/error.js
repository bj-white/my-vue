export function invokeWithErrorHandling (handler, context, args, vm, info) {
  let res
  try {
    res = args ? handler.apply(context, args) : handler.call(context)
    if (res) {
      console.log('todo..........')
    }
  } catch (e) {
    console.log('todo...........')
  }
  return res
}
