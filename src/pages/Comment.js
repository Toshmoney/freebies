import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
//   const { slug } = useParams();
const { id } = useParams();
console.log("comment page "+ id);


  useEffect(() => {
    fetch(`https://homeworktips-22mg.onrender.com/post/${id}/comments`)
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

    const response = await fetch(`https://homeworktips-22mg.onrender.com/post/${id}/comment`, {
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

  return (
    <div className="comments-section w-[80%] flex flex-col items-center mt-5">
      <h2 className="text-xl font-semibold mb-4">Recent Comments</h2>
      {comments.length > 0 ? (
        comments.map(comment => (
          <div key={comment._id} className="comment mb-2 flex flex-col w-full gap-5">
            <p className="w-[100%]">Username - <strong> {comment?.author?.username || "Anonymous"}:</strong> <br/>Comments - {comment?.text}</p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
      <form onSubmit={handleCommentSubmit} className="w-full mt-4 pb-10">
        <textarea
          className="w-full p-2 border rounded"
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
