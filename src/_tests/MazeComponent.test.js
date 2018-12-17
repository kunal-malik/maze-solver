import React from 'react'
import MazeComponent from '../components/MazeComponent'
import { shallow, mount } from 'enzyme'
import stubs from './stubs/mazeStubs';
import Constants from '../constants';

describe('MazeComponent', () => {
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
    wrapper.setState({ inputMaze: stubs.VALID_MAZE });
    const buttons = wrapper.findWhere(elment => elment.type() === 'button');
    const button = buttons.find('[data-test="button"]')
    button.simulate('click')
    const solvedMaze = wrapper.find('[id="solved-maze-container"]')
    expect(solvedMaze.exists()).toBe(true)
    expect(solvedMaze.text() == stubs.SOLVED_MAZE);
  })

  it('should display error message in case maze rows are not equal', () => {
    const wrapper = mount(<MazeComponent />)
    wrapper.setState({ inputMaze: stubs.INVALID_MAZE });
    const buttons = wrapper.findWhere(elment => elment.type() === 'button');
    const button = buttons.find('[data-test="button"]')
    button.simulate('click')
    const solvedMaze = wrapper.find('[id="solved-maze-container"]')
    expect(solvedMaze.exists()).not.toBe(true)
    expect(wrapper.state().showError).toBe(true);
  })

  it('should display error message in case of an unknown character', () => {
    const wrapper = mount(<MazeComponent />)
    wrapper.setState({ inputMaze: stubs.INVALID_MAZE_UNKNOWN_CHARACTER });
    const buttons = wrapper.findWhere(elment => elment.type() === 'button');
    const button = buttons.find('[data-test="button"]')
    button.simulate('click')
    const solvedMaze = wrapper.find('[id="solved-maze-container"]')
    expect(solvedMaze.exists()).not.toBe(true)
    expect(wrapper.state().showError).toBe(true);
    expect(wrapper.state().errorMsg).toEqual(Constants.UNKNOWN_CHARACTERS);
  })

  it('should display error message in case start is missing', () => {
    const wrapper = mount(<MazeComponent />)
    wrapper.setState({ inputMaze: stubs.INVALID_MAZE_START_MISSING });
    const buttons = wrapper.findWhere(elment => elment.type() === 'button');
    const button = buttons.find('[data-test="button"]')
    button.simulate('click')
    const solvedMaze = wrapper.find('[id="solved-maze-container"]')
    expect(solvedMaze.exists()).not.toBe(true)
    expect(wrapper.state().showError).toBe(true);
    expect(wrapper.state().errorMsg).toEqual(Constants.START_MISSING);
  })

  it('should display error message in case finish is missing', () => {
    const wrapper = mount(<MazeComponent />)
    wrapper.setState({ inputMaze: stubs.INVALID_MAZE_FINISH_MISSING });
    const buttons = wrapper.findWhere(elment => elment.type() === 'button');
    const button = buttons.find('[data-test="button"]')
    button.simulate('click')
    const solvedMaze = wrapper.find('[id="solved-maze-container"]')
    expect(solvedMaze.exists()).not.toBe(true)
    expect(wrapper.state().showError).toBe(true);
    expect(wrapper.state().errorMsg).toEqual(Constants.FINISH_MISSING);
  })

  it('should display error message in case a valid path is not found', () => {
    spyOn(MazeComponent.prototype, 'handleChange').and.callThrough();
    const wrapper = mount(<MazeComponent />)
    const inputMazeTextArea = wrapper.find('[id="input-maze"]')
    inputMazeTextArea.simulate('change', {
      target: {
        value: stubs.PATH_NOT_FOUND
      }
    })
    expect(MazeComponent.prototype.handleChange).toHaveBeenCalled()
    const buttons = wrapper.findWhere(elment => elment.type() === 'button');
    const button = buttons.find('[data-test="button"]')
    button.simulate('click')
    expect(wrapper.state().pathNotFound).toBe(true);
  })


});