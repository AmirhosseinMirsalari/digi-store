const ResponseToArray = (Response) => {
  return Response.data.data.map((item) => item.attributes);
};

export { ResponseToArray };
