import { SubReddit } from "../models/subredditModel";

const createSubreddit = async (req, res) => {
  const { title, content, posts } = req.body;
  try {
    const newSubReddit = await SubReddit.create({
      title: title,
      content: content,
      posts: posts,
    });
    res.json({ newSubReddit, message: "Votre subreddit a bien été crée" });
  } catch (error) {
    res.json({ error: error.message });
    res.status(500).send("Erreur lors de la création de votre subreddit");
  }
};

const getAsubreddit = async (req, res) => {
  try {
    const subreddit = await SubReddit.findById(res.params.id);
    res
      .json({ subreddit, message: "Voici votre subreddit :" })
      .send(`${subreddit.title} && ${subreddit.content}`);
  } catch (error) {
    res.json({ error: error.message });
    res
      .status(500)
      .send("Il y a eut un probleme dans la récupération de votre subreddit");
  }
};

const getAllSubreddits = async (req, res) => {
  try {
    const subreddits = await Post.find();
    res
      .json({ subreddits, message: "Voici tous subreddits :" })
      .send(`${subreddits.title} && ${subreddits.content}`);
  } catch (error) {
    res.json({ error: error.message });
    res
      .status(500)
      .send("Il y a eut un probleme dans la récupération de vos subreddits");
  }
};

const deleteSubreddit = async (req, res) => {
  try {
    const removeSubreddit = await SubReddit.findOneAndDelete({
      _id: req.params.id_sub,
    });
    res.json({
      removeSubreddit,
      message: "Votre subreddit a bien ete supprimé",
    });
  } catch (error) {
    res
      .status(500)
      .send(
        "Oooops ! Une erreur est survenue lors de la suppression de votre subreddit..."
      );
  }
};

export { createSubreddit, getAsubreddit, getAllSubreddits, deleteSubreddit };
