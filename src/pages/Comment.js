import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const { id } = useParams();
  console.log("comment page " + id);

  useEffect(() => {
    fetch(`https://freebiesbackend.onrender.com/post/${id}/comments`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setComments(data);
        } else {
          console.error('Unexpected response data:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
        toast.error('Error fetching comments');
      });
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    const response = await fetch(`https://freebiesbackend.onrender.com/post/${id}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ text: commentText })
    });

    if (response.ok) {
      const newComment = await response.json();
      setComments([...comments, newComment]);
      setCommentText('');
      toast.success('Comment added successfully!');
    } else {
      const errorData = await response.json();
      console.error('Error posting comment:', errorData);
      toast.error(`Error posting comment: ${errorData.message}`);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) {
      toast.error('Please enter a reply');
      return;
    }

    const response = await fetch(`https://freebiesbackend.onrender.com/post/${id}/comment/${replyingTo}/reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ text: replyText })
    });

    if (response.ok) {
      const newReply = await response.json();
      const updatedComments = comments.map(comment =>
        comment._id === replyingTo ? { ...comment, replies: [...comment.replies, newReply] } : comment
      );
      setComments(updatedComments);
      setReplyText('');
      setReplyingTo(null);
      toast.success('Reply added successfully!');
    } else {
      const errorData = await response.json();
      console.error('Error posting reply:', errorData);
      toast.error(`Error posting reply: ${errorData.message}`);
    }
  };

  const handleReplyClick = (commentId) => {
    setReplyingTo(commentId);
  };

  return (
    <div className="comments-section w-[80%] flex flex-col items-center mt-5">
      <h2 className="text-xl font-semibold mb-4">Recent Comments</h2>
      {comments.length > 0 ? (
        comments.map(comment => (
          <div key={comment._id} className="comment mb-2 flex flex-col w-full gap-5">
            <div className="flex w-[50%]">
              <p className="w-[100%]">
                <strong>{comment?.author?.username.toUpperCase() || "Anonymous"} </strong>
                says: ` {comment?.text} `
              </p>
              <button onClick={() => handleReplyClick(comment._id)} className="text-blue-500">Reply</button>
            </div>
            {comment.replies && comment.replies.map(reply => (
              <div key={reply._id} className="reply ml-4 mt-2 p-2 border rounded">
                <p>
                  <strong>{reply?.author?.username || "Anonymous"}:</strong> {reply?.text}
                </p>
              </div>
            ))}
            {replyingTo === comment._id && (
              <form onSubmit={handleReplySubmit} className="w-full mt-4 pb-2">
                <textarea
                  className="md:w-[60%] mb-2 w-full p-2 border rounded block"
                  rows="2"
                  placeholder="Add a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <button className="bg-[#242624] text-white py-1 px-3 rounded mt-2" type="submit">
                  Submit Reply
                </button>
              </form>
            )}
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
      <form onSubmit={handleCommentSubmit} className="w-full mt-4 pb-10">
        <textarea
          className="md:w-[60%] w-full block mb-2 p-2 border rounded"
          rows="4"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button className="bg-[#51B73B] text-white py-2 px-4 rounded mt-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comments;
