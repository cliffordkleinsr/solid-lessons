import { onScroll, utils } from "animejs";
import { Component, createSignal, JSX, onMount } from "solid-js";

const Progress: Component<{}> = (props) => {
  const [perc, setPerc] = createSignal(0.0);
  onMount(() => {
    // const subs = utils.$('.sub')
    const scroller = onScroll({
      target: "#article",
      container: "#progress_container",
      enter: "top top",
      leave: "bottom bottom",
      sync: 0.25,
      // debug:true,
      onUpdate: (self) => {
        setPerc(parseFloat(self.progress.toFixed(3)));
      },
    });
  });
  return (
    <>
      <div style={container} id="progress_container">
        <div
          style={{
            transform: `scaleX(${perc()})`,
            "transform-origin": "left",
            position: "sticky",
            top: 0,
            left: 0,
            right: 0,
            height: "10px",
            "background-color": "#ff0088",
          }}
        ></div>
        <article id="article" style={article} class="prose">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac
            rhoncus quam.
          </p>
          <p>
            Fringilla quam urna. Cras turpis elit, euismod eget ligula quis,
            imperdiet sagittis justo. In viverra fermentum ex ac vestibulum.
            Aliquam eleifend nunc a luctus porta. Mauris laoreet augue ut felis
            blandit, at iaculis odio ultrices. Nulla facilisi. Vestibulum cursus
            ipsum tellus, eu tincidunt neque tincidunt a.
          </p>
          <h2 class="sub">Sub-header</h2>
          <p>
            In eget sodales arcu, consectetur efficitur metus. Duis efficitur
            tincidunt odio, sit amet laoreet massa fringilla eu.
          </p>
          <p>
            Pellentesque id lacus pulvinar elit pulvinar pretium ac non urna.
            Mauris id mauris vel arcu commodo venenatis. Aliquam eu risus arcu.
            Proin sit amet lacus mollis, semper massa ut, rutrum mi.
          </p>
          <p>Sed sem nisi, luctus consequat ligula in, congue sodales nisl.</p>
          <p>
            Vestibulum bibendum at erat sit amet pulvinar. Pellentesque pharetra
            leo vitae tristique rutrum. Donec ut volutpat ante, ut suscipit leo.
          </p>
          <h2 class="sub">Sub-header</h2>
          <p>
            Maecenas quis elementum nulla, in lacinia nisl. Ut rutrum fringilla
            aliquet. Pellentesque auctor vehicula malesuada. Aliquam id feugiat
            sem, sit amet tempor nulla. Quisque fermentum felis faucibus,
            vehicula metus ac, interdum nibh. Curabitur vitae convallis ligula.
            Integer ac enim vel felis pharetra laoreet. Interdum et malesuada
            fames ac ante ipsum primis in faucibus. Pellentesque hendrerit ac
            augue quis pretium.
          </p>
          <p>
            Morbi ut scelerisque nibh. Integer auctor, massa non dictum
            tristique, elit metus efficitur elit, ac pretium sapien nisl nec
            ante. In et ex ultricies, mollis mi in, euismod dolor.
          </p>
          <p>Quisque convallis ligula non magna efficitur tincidunt.</p>
          <p>
            Pellentesque id lacus pulvinar elit pulvinar pretium ac non urna.
            Mauris id mauris vel arcu commodo venenatis. Aliquam eu risus arcu.
            Proin sit amet lacus mollis, semper massa ut, rutrum mi.
          </p>
          <p>Sed sem nisi, luctus consequat ligula in, congue sodales nisl.</p>
          <p>
            Vestibulum bibendum at erat sit amet pulvinar. Pellentesque pharetra
            leo vitae tristique rutrum. Donec ut volutpat ante, ut suscipit leo.
          </p>
          <h2 class="sub">Sub-header</h2>
          <p>
            Maecenas quis elementum nulla, in lacinia nisl. Ut rutrum fringilla
            aliquet. Pellentesque auctor vehicula malesuada. Aliquam id feugiat
            sem, sit amet tempor nulla. Quisque fermentum felis faucibus,
            vehicula metus ac, interdum nibh. Curabitur vitae convallis ligula.
            Integer ac enim vel felis pharetra laoreet. Interdum et malesuada
            fames ac ante ipsum primis in faucibus. Pellentesque hendrerit ac
            augue quis pretium.
          </p>
          <p>
            Morbi ut scelerisque nibh. Integer auctor, massa non dictum
            tristique, elit metus efficitur elit, ac pretium sapien nisl nec
            ante. In et ex ultricies, mollis mi in, euismod dolor.
          </p>
          <p>Quisque convallis ligula non magna efficitur tincidunt.</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac
            rhoncus quam.
          </p>
          <p>
            Fringilla quam urna. Cras turpis elit, euismod eget ligula quis,
            imperdiet sagittis justo. In viverra fermentum ex ac vestibulum.
            Aliquam eleifend nunc a luctus porta. Mauris laoreet augue ut felis
            blandit, at iaculis odio ultrices. Nulla facilisi. Vestibulum cursus
            ipsum tellus, eu tincidunt neque tincidunt a.
          </p>
          <h2 class="sub">Sub-header</h2>
          <p>
            In eget sodales arcu, consectetur efficitur metus. Duis efficitur
            tincidunt odio, sit amet laoreet massa fringilla eu.
          </p>
          <p>
            Pellentesque id lacus pulvinar elit pulvinar pretium ac non urna.
            Mauris id mauris vel arcu commodo venenatis. Aliquam eu risus arcu.
            Proin sit amet lacus mollis, semper massa ut, rutrum mi.
          </p>
          <p>Sed sem nisi, luctus consequat ligula in, congue sodales nisl.</p>
          <p>
            Vestibulum bibendum at erat sit amet pulvinar. Pellentesque pharetra
            leo vitae tristique rutrum. Donec ut volutpat ante, ut suscipit leo.
          </p>
          <h2 class="sub">Sub-header</h2>
          <p>
            Maecenas quis elementum nulla, in lacinia nisl. Ut rutrum fringilla
            aliquet. Pellentesque auctor vehicula malesuada. Aliquam id feugiat
            sem, sit amet tempor nulla. Quisque fermentum felis faucibus,
            vehicula metus ac, interdum nibh. Curabitur vitae convallis ligula.
            Integer ac enim vel felis pharetra laoreet. Interdum et malesuada
            fames ac ante ipsum primis in faucibus. Pellentesque hendrerit ac
            augue quis pretium.
          </p>
          <p>
            Morbi ut scelerisque nibh. Integer auctor, massa non dictum
            tristique, elit metus efficitur elit, ac pretium sapien nisl nec
            ante. In et ex ultricies, mollis mi in, euismod dolor.
          </p>
          <p>Quisque convallis ligula non magna efficitur tincidunt.</p>
          <p>
            Pellentesque id lacus pulvinar elit pulvinar pretium ac non urna.
            Mauris id mauris vel arcu commodo venenatis. Aliquam eu risus arcu.
            Proin sit amet lacus mollis, semper massa ut, rutrum mi.
          </p>
          <p>Sed sem nisi, luctus consequat ligula in, congue sodales nisl.</p>
          <p>
            Vestibulum bibendum at erat sit amet pulvinar. Pellentesque pharetra
            leo vitae tristique rutrum. Donec ut volutpat ante, ut suscipit leo.
          </p>
          <h2 class="sub">Sub-header</h2>
          <p>
            Maecenas quis elementum nulla, in lacinia nisl. Ut rutrum fringilla
            aliquet. Pellentesque auctor vehicula malesuada. Aliquam id feugiat
            sem, sit amet tempor nulla. Quisque fermentum felis faucibus,
            vehicula metus ac, interdum nibh. Curabitur vitae convallis ligula.
            Integer ac enim vel felis pharetra laoreet. Interdum et malesuada
            fames ac ante ipsum primis in faucibus. Pellentesque hendrerit ac
            augue quis pretium.
          </p>
          <p>
            Morbi ut scelerisque nibh. Integer auctor, massa non dictum
            tristique, elit metus efficitur elit, ac pretium sapien nisl nec
            ante. In et ex ultricies, mollis mi in, euismod dolor.
          </p>
          <p>Quisque convallis ligula non magna efficitur tincidunt.</p>
        </article>
      </div>
    </>
  );
};

export default Progress;

// styles
const article: JSX.CSSProperties = {
  "max-width": "500px",
  padding: "50px 20px",
  display: "flex",
  "flex-direction": "column",
  gap: "20",
};

const container: JSX.CSSProperties = {
  overflow: "auto",
  height: "500px",
  position: "relative",
};
