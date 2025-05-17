import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from './postsSlice';

export function PostsList() {
  const dispatch = useDispatch();
  const { 
    items, 
    status, 
    error, 
    currentPage, 
    hasMore,
    isFetching 
  } = useSelector((state) => state.posts);

  // Load initial page
  useEffect(() => {
    if (currentPage === 0) {
      dispatch(fetchPosts(1));
    }
  }, [dispatch, currentPage]);

  // Scroll handler with debounce
  const handleScroll = useCallback(() => {
    if (isFetching || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const scrollThreshold = 100; // pixels from bottom
    
    if (scrollTop + clientHeight < scrollHeight - scrollThreshold) return;

    // Calculate next page (currentPage is the last loaded page)
    const nextPage = currentPage + 1;
    dispatch(fetchPosts(nextPage));
  }, [dispatch, currentPage, hasMore, isFetching]);

  // Scroll listener with debounce
  useEffect(() => {
    const debouncedScroll = debounce(handleScroll, 100);
    window.addEventListener('scroll', debouncedScroll);
    return () => window.removeEventListener('scroll', debouncedScroll);
  }, [handleScroll]);

  // Simple debounce function
  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  if (status === 'loading' && items.length === 0) {
    return <div>Loading posts...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      {items.map((post) => (
        <article 
          key={`post-${post.id}`}
          style={{ 
            marginBottom: '20px',
            padding: '15px',
            border: '1px solid #eee',
            borderRadius: '4px'
          }}
        >
          <h3>{post.id} ={post.title}</h3>
          <p>{post.body}</p>
        </article>
      ))}
      
      {isFetching && items.length > 0 && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Loading more posts...
        </div>
      )}
      
      {!hasMore && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          You've reached the end
        </div>
      )}
    </div>
  );
}