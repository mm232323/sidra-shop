import Feature from "@/components/home/Feature";
import InternalLink from "@/components/home/InternalLink";
import IntroManager from "@/components/home/IntroManager";
import Header from "@/components/layout/Header";
import { Grid } from "@mantine/core";
export default function Home() {
  return (
    <main className="text-[#231104] selection:text-white selection:bg-amber-800">
      <Header theme="dark" isAuthenticated={true} />
      <IntroManager />
      <Grid
        className="relative w-9/12 left-1/2 translate-x-[-50%] grid gap-3"
        grow
      >
        <Feature type="title" title="من نحن" size={12} />
        <Feature
          type="feature"
          title="التنوع"
          desc="اكتشفوا تشكيلتنا الواسعة من منتجات العسل،كل نوع يتميز بنكهة فريدة وفوائد صحية متعددة، لتلبية جميع الأذواق والاحتياجات."
          size={4}
        />
        <Feature
          type="feature"
          title="الجوده"
          desc="نقدم لكم أعلى وأجود أنواع العسل الطبيعي، الذي يتم انتقاؤه بعناية من أفضل المناحل لضمان جودة وفوائد صحية لا مثيل لهاز"
          size={6}
          imgUrl="/home/featureImg.png"
        />
        <Feature
          type="feature"
          title="الصحة"
          desc="يعتبر عسلنا مصدرًا طبيعيًا للطاقة والفيتامينات. يساعد في تعزيز المناعة، تحسين الهضم، وتقليل الالتهابات."
          size={3}
        />
        <Feature
          type="feature"
          title="الخدمة"
          desc="نحن نقدم خدمة توصيل سريعة وموثوقة لجميع أنحاء المدينة. مع خيارات دفع متنوعة وعروض خاصة."
          size={3}
        />
        <Feature
          type="feature"
          title="الاستدامة"
          desc="نحن نؤمن بالاستدامة ونحرص على استخدام عبوات صديقة للبيئة. من خلال دعمنا للمناحل المحلية."
          size={3}
        />
      </Grid>
      <div className="relative flex w-full h-fit p-[30px] bg-[#ffa01c23] gap-[20px] z-[-3] text-white mt-[80px] max-[760px]:flex-col">
        <InternalLink desc="في هذه الصفحه نعرض لكم عروضنا منشورتنا الجديد علي وسائل التوصل" imgUrl='/home/newsImg.png' href='/news' linkText='ما الجديد' >المنشورات</InternalLink>
        <InternalLink desc="في هذه الصفحه تعرض لكم منتجاتنا وعروضنا المتوفرة  معي اعلي الخصومات" imgUrl='/home/shopImg.png' href='/shop' linkText='تصفح الان' >المنتجات</InternalLink>
      </div>
    </main>
  );
}
