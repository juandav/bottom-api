export default (data) => {
  return () => {
    let verify = (typeof data == 'object') ? true : false;
    let value  = (verify === true) ? JSON.parse(JSON.stringify(data)) : undefined;
    return value;
  }
}
