import { getDBInstance  } from '../db/dbSelector.js';

const collectionName = "Social"

export const getSocialById = async (req, res) => {
  const response = await getDBInstance().getById(collectionName, req.params.id);
  res.json(response);
};

export const getAllSocials = async (req, res) => {
  const response = await getDBInstance().get(collectionName);
  res.json(response);
};

export const createSocial = async (req, res) => {
  const response = await getDBInstance().create(collectionName, req.body);
  res.status(201).json(response);
};

export const updateSocial = async (req, res) => {
  const response = await getDBInstance().update(collectionName, req.params.id, req.body);
  res.json(response);
};

export const deleteSocial = async (req, res) => {
  const response = await getDBInstance().remove(collectionName, req.params.id);
  res.status(204).send(response);
};

export const getPosts = async (req, res) => {
  try {
    const userId = req.id;
    const posts = await getDBInstance().get(collectionName, { type: 'post' });

    const formattedPosts = posts.map(post => ({
      id: post._id,
      username: post.user?.username || 'Unknown',
      profileImage: post.user?.profileImage || '',
      imageUrl: post.imageUrl || (post.media?.[0]?.url ?? ''),
      caption: post.caption || '',
      location: post.event || null,
      timestamp: post.createdAt,
      likeCount: post.likes?.length || 0,
      isLiked: userId ? post.likes.some(u => u._id.equals(userId)) : false,
      likedBy: post.likes.map(u => ({
        id: u._id,
        username: u.username,
        profileImage: u.profileImage || ''
      })),
      commentCount: post.comments?.length || 0,
      comments: post.comments.map(c => ({
        id: c._id,
        username: c.user?.username || 'Unknown',
        profileImage: c.user?.profileImage || '',
        text: c.text,
        timestamp: c.createdAt
      }))
    }));

    res.json(formattedPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

export const getStories = async (req, res) => {
  try {
    const userId = req.id; 
    const now = new Date();

    const stories = await getDBInstance().get(collectionName, {
        type: 'story',
        $or: [
          { expiresAt: { $exists: false } }, 
          { expiresAt: { $gt: now } }      
        ]
    });

    const formattedStories = stories.map(story => ({
      id: story._id,
      username: story.user?.username || 'Unknown',
      profileImage: story.user?.profileImage || '',
      isOfficial: story.user?.isOfficial || false,
      isViewed: userId ? story.viewedBy.some(u => u.equals(userId)) : false,
      viewedBy: story.viewedBy.map(u => u.toString()),
      expired: story.expiresAt ? story.expiresAt <= now : false
    }));

    res.json(formattedStories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
};