import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

import { Navigation } from "swiper/modules";

export const MobileList = () => {
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [data, setData] = useState(null);

  const gridItemDetails = [
    {
      color: "#41ca6e",
      logoWidth: 30,
    },
    {
      color: "#fab153",
      logoWidth: 30,
    },
    {
      color: "#7277d5",
      logoWidth: 50,
    },
    {
      color: "#f87d51",
      logoWidth: 50,
    },
    {
      color: "#ed5466",
      logoWidth: 50,
    },
    {
      color: "#4ec2e7",
      logoWidth: 30,
    },
  ];

  useEffect(() => {
    const getMobileList = () => {
      fetch("https://krds-assignment.github.io/aoc/api-assets/data.json")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setData(data ?? []);
        });
    };
    getMobileList();
  }, []);

  return (
    <div>
      <div className="desktopTabletView">
        <div className="gridWrapper">
          {data &&
            data?.features &&
            data?.features.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: gridItemDetails[index]?.color,
                    display: "grid",
                    gridTemplateRows: index === 0 ? "65px auto" : "auto auto",
                  }}
                >
                  {index === 0 && (
                    <img className="mainLogo" src={data?.logo} alt="" />
                  )}
                  <div
                    className="gridItem"
                    style={{
                      gridTemplateColumns:
                        index === 5 ? "auto 180px" : "auto auto",
                    }}
                  >
                    <div style={{ width: 140, marginLeft: "auto" }}>
                      <img
                        style={{ width: gridItemDetails[index].logoWidth }}
                        className="logo"
                        src={item.logo}
                        alt=""
                      />
                      <div className="title">{item.title}</div>
                      <hr />

                      <div className="desc">{item.desc}</div>
                    </div>
                    <div
                      style={{
                        display: "block",
                        marginLeft: "auto",
                        marginTop: index === 5 ? 50 : 0,
                      }}
                    >
                      <img
                        src={item.image}
                        className="gridImage"
                        style={{ maxWidth: index === 5 ? "200px" : "135px" }}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="mobileView">
        <img className="mainLogo" src={data?.logo} alt="" />
        <Swiper
          spaceBetween={50}
          onSlideChange={(slides) => setMobileActiveIndex(slides.activeIndex)}
          onSwiper={(swiper) => console.log(swiper)}
          navigation={true}
          modules={[Navigation, Pagination]}
          pagination={true}
          style={{ backgroundColor: gridItemDetails[mobileActiveIndex].color }}
        >
          <div style={{ paddingBottom: 50 }}>
            {data &&
              data?.features &&
              data?.features.map((item, index) => {
                return (
                  <SwiperSlide>
                    <div
                      key={index}
                      style={{
                        backgroundColor: gridItemDetails[index]?.color,
                      }}
                    >
                      <div className="gridItem">
                        <div>
                          <img className="logo" src={item.logo} alt="" />
                          <div className="title">{item.title}</div>
                          <hr />

                          <div className="desc">{item.desc}</div>
                        </div>
                        <div
                          style={{
                            display: "block",
                            marginTop: index === 5 ? 50 : 0,
                          }}
                        >
                          <img src={item.image} className="gridImage" alt="" />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </div>
        </Swiper>
      </div>
    </div>
  );
};
