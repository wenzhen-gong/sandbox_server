const supabase = require("../db.js");

const scoreController = {};

scoreController.addScore = async (req, res, next) => {
  try {
    const { score, name } = req.body;
    const { data, error } = await supabase
      .from("record")
      .insert({ name, score })
      .select();

    if (error) {
      return next({
        log: `scoreController.addScore - Supabase insert error; ERROR: ${error}`,
        message: {
          err: "Error in scoreController.addScore; Check server logs",
        },
      });
    }

    res.locals.record = data;
    return next();
  } catch (err) {
    return next({
      log: `scoreController.addScore ERROR: ${err}`,
      message: {
        err: "Error in scoreController.addScore; Check server logs",
      },
    });
  }
};

scoreController.getScore = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from("record").select();

    if (error) {
      return next({
        log: `scoreController.addScore - Supabase insert error; ERROR: ${error}`,
        message: {
          err: "Error in scoreController.addScore; Check server logs",
        },
      });
    }
    res.locals.score = data;
    return next();
  } catch (err) {
    return next({
      log: `scoreController.getScore ERROR: ${err}`,
      message: {
        err: "Error in scoreController.getScore; Check server logs",
      },
    });
  }
};

module.exports = scoreController;
