import ContentLoader from 'react-content-loader'

export const SkeletonLoader = () => {

  const skeletons = []
  for (let i = 0; i < 12; i++) {
    skeletons.push(
      <ContentLoader 
        key={i}
        speed={2}
        interval={0.25}
        width={300}
        height={350}
        viewBox="0 0 300 350"
        backgroundColor="#e9e9e9"
        foregroundColor="#aaa"
      >
        <rect x="10" y="10" rx="10" ry="10" width="250" height="300" />
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
