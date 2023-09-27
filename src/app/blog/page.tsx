import {
  BlogPost,
  FeatureBanner,
  Pagination,
  SectionHeading,
} from '@/components'
import mock from './mock.json'
export default function AboutPage() {
  const image = 'https://i.imgur.com/2mtkCcY.jpg'
  const totalPages = mock.data.length
  const bannerData = {
    title: 'Blog title',
    caption: 'Blog caption lorem ipsum',
    src: image,
    alt: 'alt lorem ipsum',
  }

  return (
    <div className="page-wrapper">
      <div className="flex flex-col gap-6 justify-center md:p-16">
        <div className="flex flex-col gap-6 justify-center">
          <SectionHeading title="Blog" />
          <FeatureBanner {...bannerData} />
        </div>
        <div className="flex flex-col gap-12 justify-center">
          {mock.data.slice(0, 3).map((post) => (
            <BlogPost key={post.id} {...post} />
          ))}
          <Pagination hidePrevButton count={totalPages} page={1} />
        </div>
      </div>
    </div>
  )
}
