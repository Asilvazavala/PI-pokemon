import ContentLoader from 'react-content-loader';
import styles from './SkeletonLoaderDetails.module.css';

export const SkeletonLoaderDetails = () => {
  const skeletons = []
  for (let i = 0; i < 1; i++) {
    skeletons.push(
      <ContentLoader 
        key={i}
        speed={2}
        interval={0.25}
        width={1250}
        height={500}
        viewBox="0 0 1250 500"
        backgroundColor="#e9e9e9"
        foregroundColor="#aaa"
      >
        <rect className={styles.prevNext}  x="30" y="10" rx="10" ry="10" width="1100" height="50" />
        <rect className={styles.title}  x="30" y="80" rx="10" ry="10" width="400" height="50" />
        <rect className={styles.content} x="30" y="150" rx="10" ry="10" width="1100" height="400" />
      </ContentLoader>
    )
  }

  return (
    <main>
      { 
        skeletons
      }
    </main>
  )
}
