import React from 'react';

const CommentComponent = ({ comment, depth = 0 }) => {
  // Maximum depth before we stop indenting (optional)
  const maxDepth = 8;
  const indentSize = Math.min(depth, maxDepth);

  return (
    <div
      className={`comment ${depth > 0 ? 'reply' : ''}`}
      style={{
        marginLeft: `${indentSize * 20}px`,
        borderLeft: depth > 0 ? '2px solid #ddd' : 'none',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: depth % 2 === 0 ? '#f9f9f9' : '#fff'
      }}
    >
      <div className="comment-header">
        <span className="comment-author">{comment.author}</span>
        <span className="comment-timestamp">{comment.timestamp}</span>
      </div>
      <div className="comment-text">{comment.text}</div>

      {/* Recursive rendering of replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map((reply) => (
            <CommentComponent
              key={reply.id}
              comment={reply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Example usage
const CommentsSection = () => {
  const comments = [
    {
      id: '1',
      author: 'user1',
      text: 'This is the first comment!',
      timestamp: '2 hours ago',
      replies: [
        {
          id: '2',
          author: 'user2',
          text: 'This is a reply to the first comment',
          timestamp: '1 hour ago',
          replies: [
            {
              id: '3',
              author: 'user3',
              text: 'This is a nested reply!',
              timestamp: '30 minutes ago',
              replies: []
            }
          ]
        }
      ]
    },
    {
      id: '4',
      author: 'user4',
      text: 'This is another top-level comment',
      timestamp: '3 hours ago',
      replies: []
    }
  ];

  return (
    <div className="comments-section">
      <h2>Comments ({comments.length})</h2>
      {comments.map((comment) => (
        <CommentComponent key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsSection;