import { render, screen } from '@testing-library/angular';
import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component';

describe('<%= classify(name) %>Component', () => {
  const renderOptions = {
    imports: [],
  };

  it('should create component', async () => {
    const rr = await render(<%= classify(name) %>Component, renderOptions);
    expect(rr.fixture.componentInstance).toBeTruthy();
  });

  it('should show message [<%= dasherize(name) %> works!]', async () => {
    await render(<%= classify(name) %>Component, renderOptions);
    expect(screen.getByText('<%= dasherize(name) %> works!')).not.toBeNull();
  });
});
