import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

function App() {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [data_, setData_] = useState([]);
  const handleShow = (id) => {
    setShow((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.punkapi.com/v2/beers`)
      .then((response) => {
        setLoading(false);
        setData_(response.data);
        console.log(response);
      })
      .catch((err) => {
        setLoading(false);
        console.log("error fetching data", err);
      });
  }, []);
  return (
    <>
      {loading ? (
        <div
          class="text-center mt-5 d-flex align-items-center justify-content-center gap-2"
          style={{ color: "#0d6efd" }}
        >
          <span
            style={{ width: "2rem", height: "2rem" }}
            class="spinner-border"
            role="status"
            aria-hidden="true"
          ></span>
        </div>
      ) : (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 5 }}>
          <Masonry>
            {data_?.map((item, index) => (
              <Card
                className="data_card p-3 mb-3"
                style={{
                  width: "18rem",
                }}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ height: 200 }}
                >
                  <img alt="img" src={item.image_url} style={{ width: 50 }} />
                </div>
                <CardBody>
                  <CardTitle tag="h5">{item.name}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {item.tagline}
                  </CardSubtitle>
                  <CardText style={{ fontSize: 11 }}>
                    {item.description}
                  </CardText>
                  <p
                    className="text-primary curs"
                    onClick={() => handleShow(item.id)}
                  >
                    <b>Show more</b>
                  </p>
                  {show[item.id] && (
                    <div>
                      <p className="m-0">{item.first_brewed}</p>
                      <div className="d-flex gap-1">
                        <p className="m-0">
                          <span className="text-secondary small">ABV</span>:{" "}
                          {item.abv}
                        </p>
                        <p className="m-0">
                          <span className="text-secondary small">IBU</span>:{" "}
                          {item.ibu}
                        </p>
                        <p className="m-0">
                          <span className="text-secondary small">FG</span>:{" "}
                          {item.target_fg}
                        </p>
                      </div>

                      <div className="d-flex gap-1">
                        <p className="m-0">
                          <span className="text-secondary small">OG</span>:{" "}
                          {item.target_og}
                        </p>
                        <p className="m-0">
                          <span className="text-secondary small">EBC</span>:{" "}
                          {item.ebc}
                        </p>
                        <p className="m-0">
                          <span className="text-secondary small">SRM</span>:{" "}
                          {item.srm}
                        </p>
                      </div>
                      <div className="d-flex gap-1">
                        <p className="m-0">
                          <span className="text-secondary small">PH</span>:{" "}
                          {item.ph}
                        </p>
                        <p className="m-0">
                          <span className="text-secondary small">ATNT</span>:{" "}
                          {item.attenuation_level}
                        </p>
                        <p className="m-0">
                          <span className="text-secondary small">Value</span>:{" "}
                          {item.volume.value}
                        </p>
                      </div>
                      <div className="d-flex gap-1">
                        <p className="m-0">
                          <span className="text-secondary small">Unit</span>:{" "}
                          {item.volume.unit}
                        </p>
                        <p className="m-0">
                          <span className="text-secondary small">BValue</span>:{" "}
                          {item.boil_volume.value}
                        </p>
                        <p className="m-0">
                          <span className="text-secondary small">BUnit</span>:{" "}
                          {item.boil_volume.unit}
                        </p>
                      </div>

                      <div className="mt-3">
                        <p className="m-0">
                          <b>Mash</b>
                        </p>
                        {item.method.mash_temp.map((it, ind) => (
                          <div className="d-flex gap-1">
                            <p>{it.duration}</p>
                            <p>{it.temp.value}</p>
                            <p>{it.temp.unit}</p>
                          </div>
                        ))}
                      </div>
                      <div className="">
                        <p className="m-0">
                          <b>Fermentation</b>
                        </p>
                        <div className="d-flex gap-1">
                          <p>{item.method.fermentation.temp.value}</p>
                          <p>{item.method.fermentation.temp.unit}</p>
                          <p>{item.method.fermentation.twist}</p>
                        </div>
                      </div>
                      <div>
                        <p className="m-0">
                          <b>Ingredients</b>
                        </p>
                        {item.ingredients.malt.map((it, ind) => (
                          <>
                            <p className="m-0">{it.name}</p>
                            <div className="d-flex gap-1">
                              <p>{it.amount.value}</p>
                              <p>{it.amount.unit}</p>
                            </div>
                          </>
                        ))}
                      </div>
                      <div>
                        <p className="m-0">
                          <b>Hops</b>
                        </p>
                        {item.ingredients.hops.map((it, ind) => (
                          <div className="d-flex gap-1">
                            <p className="m-0">{it.name}</p>
                            <p className="m-0">{it.amount.value}</p>
                            <p className="m-0">{it.amount.unit}</p>
                            <p className="m-0">{it.add}</p>
                            <p className="m-0">{it.attribute}</p>
                          </div>
                        ))}
                      </div>
                      <>
                        <p className="m-0 mt-3">
                          <b>Yeast</b>
                        </p>
                        <p>{item.ingredients.yeast}</p>
                      </>

                      <div>
                        <p className="m-0">
                          <b>Food pairing</b>
                        </p>
                        {item.food_pairing.map((it, ind) => (
                          <>
                            <p className="m-0">{it},</p>
                          </>
                        ))}
                      </div>
                      <>
                        <p className="mt-3 m-0">
                          <b>Tips</b>
                        </p>
                        <p>{item.brewers_tips}</p>
                      </>
                      <>
                        <p className="mt-3 m-0">
                          <b>Contributed by</b>
                        </p>
                        <p>{item.contributed_by}</p>
                      </>
                    </div>
                  )}
                </CardBody>
              </Card>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </>
  );
}

export default App;
