const ResponseToArray = (Response) => {
  Response.data.data.map((item) => item.attributes);
};

export { ResponseToArray };
