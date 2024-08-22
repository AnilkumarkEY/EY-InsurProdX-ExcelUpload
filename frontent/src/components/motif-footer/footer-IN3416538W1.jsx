import { MotifFooter, MotifButtonGroup, MotifButton } from '@ey-xd/motif-react';
const Footer = () => {
    return (
        <>
            <div
  style={{
    background: 'var(--footer--bg-color)',
    border: 'var(--card--border-width) var(--card--border-style) var(--card--border-color)',
    height: '300px',
    overflow: 'auto'
  }}
>
  <div
    style={{
      padding: '0 24px'
    }}
  >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.{' '}
    </p>
    <p>
      Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.{' '}
    </p>
    <p>
      Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus.{' '}
    </p>
    <p>
      Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris.{' '}
    </p>
    <p>
      Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet.{' '}
    </p>
  </div>
  <MotifFooter sticky>
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '7px'
        }}
      >
        <p className="motif-body2-default-regular">
          Text
        </p>
        <p className="motif-body2-default-light">
          Subtext
        </p>
        <MotifButtonGroup
          size="medium"
          variant="ghost"
        >
          <MotifButton>
            Optional Action
          </MotifButton>
          <MotifButton>
            Optional Action
          </MotifButton>
        </MotifButtonGroup>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '16px'
        }}
      >
        <MotifButton variant="ghost">
          Cancel
        </MotifButton>
        <MotifButton variant="secondary">
          Save draft
        </MotifButton>
        <MotifButton variant="primary">
          Submit
        </MotifButton>
      </div>
    </div>
  </MotifFooter>
</div>
        </>
    )
}

export default Footer;