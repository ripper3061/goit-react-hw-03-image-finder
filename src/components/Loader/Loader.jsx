import ClipLoader from 'react-spinners/ClipLoader';

export const Loader = ({ isLoading }) => {
  return (
    <ClipLoader
      color="blue"
      loading={isLoading}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
      cssOverride={{ margin: 'auto' }}
    />
  );
};
