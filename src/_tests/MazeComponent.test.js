import React from 'react'
import MazeComponent from '../components/MazeComponent'
import { shallow, mount } from 'enzyme'

describe('RosterComponent component ', () => {
  const validMaze = `###########
    S #   #   #
    # # # # # #
    #   #   # #
    ######### #
    # #       #
    # # #######
    # #   #   #
    # # # ### #
    #   #     F
    ###########`;

  const solvedMazeStr = `###########
    S^#^^^#^^^#
    #^#^#^#^#^#
    #^^^#^^^#^#
    #########^#
    # #^^^^^^^#
    # #^#######
    # #^^^#   #
    # # #^### #
    #   #^^^^^F
    ###########`

  const invalidMaze = `###########
    S #   #   #
    # # # # # #
    #   #   # #
    ######### #
    # #       #
    # # #######
    # #   #   #
    # # # ### #
    #   #     F
    ##########`;

  it('renders without crashing', () => {
    shallow(<MazeComponent />)
  });

  it('should render textarea for user to input maze', () => {
    const wrapper = mount(<MazeComponent />)
    const container = wrapper.find('[id="maze-container"]')
    expect(container.exists()).toBe(true)
    const inputMazeTextArea = container.find('[id="input-maze"]')
    expect(inputMazeTextArea.exists()).toBe(true)
    const button = container.find('[data-test="button"]')
    expect(button.exists()).toBe(true)
  })

  it('should call handleClick function on click of button', () => {
    spyOn(MazeComponent.prototype, 'handleClick').and.callThrough();
    spyOn(MazeComponent.prototype, 'solveMaze').and.callThrough();
    const wrapper = mount(<MazeComponent />)
    const buttons = wrapper.findWhere(elment => elment.type() === 'button');
    const button = buttons.find('[data-test="button"]')
    button.simulate('click')
    expect(MazeComponent.prototype.handleClick).toHaveBeenCalled()
    expect(MazeComponent.prototype.solveMaze).toHaveBeenCalled()
  })

  it('should call resetAll function on click of button when maze has been solved', () => {
    spyOn(MazeComponent.prototype, 'resetAll').and.callThrough();
    const wrapper = mount(<MazeComponent />)
    wrapper.setState({ solvedMaze: [[]] });
    const buttons = wrapper.findWhere(elment => elment.type() === 'button');
    const button = buttons.find('[data-test="button"]')
    button.simulate('click')
    expect(MazeComponent.prototype.resetAll).toHaveBeenCalled()
  })

  it('should display solved maze on click of button when user has entered a valid maze', () => {
    const wrapper = mount(<MazeComponent />)
    wrapper.setState({ inputMaze: validMaze });
    const buttons = wrapper.findWhere(elment => elment.type() === 'button');
    const button = buttons.find('[data-test="button"]')
    button.simulate('click')
    const solvedMaze = wrapper.find('[id="solved-maze-container"]')
    expect(solvedMaze.exists()).toBe(true)
    expect(solvedMaze.text() == solvedMazeStr);
  })

  it('should display error message in case maze rows are not equal', () => {
    const wrapper = mount(<MazeComponent />)
    wrapper.setState({ inputMaze: invalidMaze });
    const buttons = wrapper.findWhere(elment => elment.type() === 'button');
    const button = buttons.find('[data-test="button"]')
    button.simulate('click')
    const solvedMaze = wrapper.find('[id="solved-maze-container"]')
    expect(solvedMaze.exists()).not.toBe(true)
    expect(wrapper.state().showError).toBe(true);
  })


});