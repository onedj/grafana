// Libraries
import React, { PureComponent } from 'react';

// Types
import { NavModelItem, AppRootProps } from '@grafana/data';

interface Props extends AppRootProps {}

interface State {
  result: any;
}

const TAB_ID_A = 'A';
const TAB_ID_B = 'B';
const TAB_ID_C = 'C';

export class ExampleRootPage<ExampleAppSettings> extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      result: null,
    };
  }

  componentDidMount() {
    this.updateNav();

    fetch('http://localhost:8080/api/orgs/sit/products/test', {
      headers: {
        Authorization: 'Basic b2RqY29yZTo5dnd2YXltRXdBZktCbXlh',
      },
    })
      .then(res => res.json())
      .then(resJson => {
        this.setState({ result: resJson });
      });
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.query !== prevProps.query) {
      if (this.props.query.tab !== prevProps.query.tab) {
        this.updateNav();
      }
    }
  }

  updateNav() {
    const { path, onNavChanged, query, meta } = this.props;

    const tabs: NavModelItem[] = [];
    tabs.push({
      text: 'Tab A',
      icon: 'fa fa-fw fa-file-text-o',
      url: path + '?tab=' + TAB_ID_A,
      id: TAB_ID_A,
    });
    tabs.push({
      text: 'Tab B',
      icon: 'fa fa-fw fa-file-text-o',
      url: path + '?tab=' + TAB_ID_B,
      id: TAB_ID_B,
    });
    tabs.push({
      text: 'Tab C',
      icon: 'fa fa-fw fa-file-text-o',
      url: path + '?tab=' + TAB_ID_C,
      id: TAB_ID_C,
    });

    // Set the active tab
    let found = false;
    const selected = query.tab || TAB_ID_B;
    for (const tab of tabs) {
      tab.active = !found && selected === tab.id;
      if (tab.active) {
        found = true;
      }
    }
    if (!found) {
      tabs[0].active = true;
    }

    const node = {
      text: 'This is the Page title',
      img: meta.info.logos.large,
      subTitle: 'subtitle here',
      url: path,
      children: tabs,
    };

    // Update the page header
    onNavChanged({
      node: node,
      main: node,
    });
  }

  render() {
    const { path, query, meta } = this.props;
    const { result } = this.state;

    return (
      <div>
        {result ? <pre>{JSON.stringify(result, null, 2)}</pre> : 'loading'}
        QUERY: <pre>{JSON.stringify(query)}</pre>
        <br />
        <ul>
          <li>
            <a href={path + '?x=1'}>111</a>
          </li>
          <li>
            <a href={path + '?x=AAA'}>AAA</a>
          </li>
          <li>
            <a href={path + '?x=1&y=2&y=3'}>ZZZ</a>
          </li>
        </ul>
        <pre>{JSON.stringify(meta.jsonData)}</pre>
      </div>
    );
  }
}
