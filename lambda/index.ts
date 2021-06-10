type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    name: string;
  };
};

exports.handler = async (event: AppSyncEvent) => {
  switch (event.info.fieldName) {
    case "hello":
      return "Hello From App Sync";

    case "age":
      return 10;

    case "title":
      return `Your Title Name is ${event.arguments.name}`;

    default:
      return null;
  }
};
