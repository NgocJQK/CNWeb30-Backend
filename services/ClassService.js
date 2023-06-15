const ClassModel = require("../models/Class");
const pluralize = require("pluralize");

// Attempt to reuse the group function for future grouping (if any)
const groupBy = async (model, list, property) => {
  const propertys = pluralize(property);
  // initialize return list
  let returnData = await model.aggregate().group({
    _id: `$${property}`,
  });
  returnData.map((data) => {
    data[`${property}`] = data["_id"];
    delete data["_id"];
    data[`${propertys}`] = [];
  });

  // put items from old array to new array inside return list
  list.map((oldItem) => {
    returnData.map((newItem) => {
      if (oldItem[`${property}`] === newItem[`${property}`]) {
        newItem[`${propertys}`].push(oldItem);
      }
    });
  });

  return returnData;
};

exports.getAllClasses = async (filters = null) => {
  let classes = await ClassModel.find();

  if (filters) {
    if ("groupBy" in filters) {
      if (filters.groupBy === "semester") {
        // // get semesters
        // let semesters = await ClassModel.aggregate().group({
        //   _id: "$semester",
        // });
        // semesters.map((semester) => {
        //   semester["semester"] = semester["_id"];
        //   delete semester["_id"];
        //   semester._classes = [];
        // });

        // // list classes
        // classes.map((_class) => {
        //   semesters.map((semester) => {
        //     if (_class.semester === semester.semester) {
        //       semester._classes.push(_class.toObject());
        //     }
        //   });
        // });

        // return semesters;
        return await groupBy(ClassModel, classes, filters.groupBy);
      }
    }
  }
  // return await ClassModel.find();
  return classes;
};

exports.getClassById = async (id) => {
  return await ClassModel.findById(id);
};

exports.createClass = async (_class) => {
  return await ClassModel.create(_class);
};

exports.updateClass = async (id, _class) => {
  return await ClassModel.findByIdAndUpdate(id, _class);
};

exports.deleteClass = async (id) => {
  return await ClassModel.findByIdAndDelete(id);
};
