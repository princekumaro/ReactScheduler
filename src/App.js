import { createRoot } from "react-dom/client";
import "./index.css";
import * as React from "react";
import { useEffect, useRef } from "react";
import {
  ScheduleComponent,
  ResourcesDirective,
  ResourceDirective,
  ViewsDirective,
  ViewDirective,
  Inject,
  TimelineViews,
  Resize,
  DragAndDrop,
  TimelineMonth,
} from "@syncfusion/ej2-react-schedule";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { FiFilter } from "react-icons/fi"; // Import your desired icons
import { BsSortDown } from "react-icons/bs"; // Import your desired icons
import { LuFilterX } from "react-icons/lu"; // Import your desired icons

import {
  extend,
  closest,
  remove,
  addClass,
  Internationalization,
  isNullOrUndefined, removeClass
} from "@syncfusion/ej2-base";
import { updateSampleSection } from "./sample-base";
import { ContextMenuComponent, TreeViewComponent } from "@syncfusion/ej2-react-navigations";
// import dataSource from "./datasource.json";
import dataSource from "./planner_data3.json";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { Padding, Rect } from "@syncfusion/ej2-documenteditor";
import { DataManager, Query } from "@syncfusion/ej2-data";
import moment from "moment/moment";
import { Box, Flex, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Select, useDisclosure } from "@chakra-ui/react";
import Header from "./Header";
import EmployeeProductivity from "./EmployeeProductivity";

/**
 * schedule resources group-editing sample
 */
const App = () => {
  useEffect(() => {
    updateSampleSection();
  }, []);
  let scheduleObj = useRef(null);
  let treeObj = useRef(null);
  let isTreeItemDropped = false;
  let draggedItemId = "";
  const allowDragAndDrops = true;


  const titleObj = useRef(null);
  const intl = new Internationalization();
  const eventTypeObj = useRef(null);
  const notesObj = useRef(null);
  const workStation = [
    "POWER PRESS 30 TONS",
    "NAVTECH FACING",

    "HARKARAM LONG DRILL",
    "GURJIT TURNIGN 1",
    "GURJIT UNDERCUT",

    "HARKARAM SIDE DRILL",
    "POLYTECH CHAMFERING MACHINE",
    "MULTI DRILL AKN 1",
    "DRILL SMALL -1",
    "POLYTECH CHAMFERING MACHINE",
    "REAMER -PH",
    "SLOTTING 1",
    "BUFFING 1 -PH",
    "MULTI TAP AKN 1",
    "ALKALINE BARREL 1",
    "PACKING LINE",
    "POWER PRESS 30 TONS",
    "PACKING LINE",
    "CNC GRINDING 1",
    "MULTI TAP AKN 1",
    "BUFFING 1 -PH",
    "REAMER -PH"
  ];

  const [newSourceData, setNewSourceData] = React.useState([])

  React.useEffect(() => {
    setNewSourceData(
      dataSource.plannerData.map((item, i) => {
        console.log(moment(moment(moment(new Date()).format('L') + ' ' + item.Start_Time)).toISOString())
        return {
          ...item, Color: item.WorkOrder === "MFG-WO-2023-00001" ? "#FFC436" : "#465B80", StartTime: moment(moment(moment(new Date()).format('L') + ' ' + item.Start_Time).format()).toISOString(), EndTime: moment(moment(moment(new Date()).format('L') + ' ' + item.End_Time).format()).toISOString(), Workstations: item.Workstation
        }
      })
    )
  }, [])

  const fields = {
    dataSource: newSourceData,
    id: "Name",
    text: "Operation",
    WorkOrder: "WorkOrder",
    Operation: "Operation",
    Workstation: "Workstation",
    Production_Item: "Production_Item",
    Qty_To_Manufacture: "Qty_To_Manufacture",
    Total_Completed_Qty: "Total_Completed_Qty",
    Operation_Time_per_100_Unit: "Operation_Time_per_100_Unit",
    Start_Time: "Start_Time",
    End_Time: "End_Time",
    Completed: "Completed",
    Remaining: "Remaining",
    Time_In_Minutes_For_Job: "Time_In_Minutes_For_Job"
  };

  console.log({ newSourceData })

  let plannerHeaders = workStation.map((item, i) => {

    return {
      Text: item,
      Id: item,
      Color: "#337CCF",
      GroupId: item,
    }
  })

  console.log({ plannerHeaders })
  const getTimeString = (value) => {
    console.log(intl.parseDate("10:00 pm", { skeleton: "hm" }))
    return intl.formatDate(value, { skeleton: "hm" });
  };

  const treeTemplate = (props) => {
    // console.log({ props })
    return (
      <div id="waiting">
        {/* <div id="waitdetails"> */}
        {/* <div id="waitlist">{props.Operation}</div> */}
        {/* <div id="waitcategory">{props.WorkOrder}</div> */}
        {/* <div id="waitcategory">
            {props.Start_Time} - {props.End_Time}
          </div>
        </div> */}
        <div class="table-row">
          <div class="table-cell">{props.Name}</div>
          <div class="table-cell">{props.Operation}</div>
          <div class="table-cell">{props.Total_Completed_Qty}</div>
        </div>

        {/* <tr>
          <td>{props.WOr}</td>
          <td>{props.Operation}</td>

          <td>{props.Qty_To_Manufacture}</td>
        </tr> */}


      </div>
    );
  };
  const onItemSelecting = (args) => {
    console.log({ args });
    // args.cancel = true;
  };
  const onTreeDrag = (event) => {
    // console.log(scheduleObj.current);

    if (scheduleObj.current.isAdaptive) {
      let classElement =
        scheduleObj.current.element.querySelector(".e-device-hover");
      if (classElement) {
        classElement.classList.remove("e-device-hover");
      }
      if (event.target.classList.contains("e-work-cells")) {
        addClass([event.target], "e-device-hover");
      }
    }
  };
  const onActionBegin = (event) => {
    if (event.requestType === "eventCreate" && isTreeItemDropped) {
      let treeViewData = treeObj.current.fields.dataSource;
      const filteredPeople = treeViewData.filter(
        (item) => item.ID !== draggedItemId
      );


      treeObj.current.fields.dataSource = filteredPeople;
      let elements = document.querySelectorAll(
        ".e-drag-item.treeview-external-drag"
      );
      for (let i = 0; i < elements.length; i++) {
        remove(elements[i]);
      }
    }
  };
  const onEventClick = (args) => {
    console.log(args.event);
    if (!args.event.RecurrenceRule) {
      scheduleObj.current.openEditor(args.event, "Add");
    } else {
      scheduleObj.current.quickPopup.openRecurrenceAlert();
    }
  };
  const onTreeDragStop = (event) => {
    let treeElement = closest(event.target, ".e-treeview");
    let classElement =
      scheduleObj.current.element.querySelector(".e-device-hover");
    if (classElement) {
      classElement.classList.remove("e-device-hover");
    }
    if (!treeElement) {
      event.cancel = true;
      console.log({ event });
      let scheduleElement = closest(event.target, ".e-content-wrap");
      if (scheduleElement) {
        let treeviewData = treeObj.current.fields.dataSource;
        if (event.target.classList.contains("e-work-cells")) {
          const filteredData = treeviewData.filter(
            (item) => item.Name === event.draggedNodeData.id
          );
          let cellData = scheduleObj.current.getCellDetails(event.target);
          let resourceDetails = scheduleObj.current.getResourcesByIndex(
            cellData.groupIndex
          );

          console.log({ treeviewData })
          console.log({ filteredData })

          // console.log(moment(moment(moment(new Date()).format('L') + ' ' + filteredData[0].End_Time).format()).toDate());
          let eventData = {
            ...filteredData[0],
            Operation: filteredData[0].Operation,
            // Start_Time: filteredData[0].Start_Time,
            // End_Time: filteredData[0].End_Time,

            // Start_Time: moment(moment(moment(new Date()).format('L') + ' ' + filteredData[0].Start_Time).format()).toDate(),
            // End_Time: moment(moment(moment(new Date()).format('L') + ' ' + filteredData[0].End_Time).format()).toDate(),
            IsAllDay: cellData.isAllDay,
            Workstations: resourceDetails.resourceData.GroupId,
            description: "testing",
            startTime: cellData.startTime,
            endTime: cellData.endTime,
            Start_Time: cellData.startTime,
            End_Time: cellData.endTime,
            StartTime: cellData.startTime,
            EndTime: cellData.endTime,
            Column1: filteredData[0].Column1,
            ID: filteredData[0].ID,
            Operation_Time_per_100_Unit: filteredData[0].Operation_Time_per_100_Unit,
            Production_Item: filteredData[0].Production_Item,
            Qty_To_Manufacture: filteredData[0].Qty_To_Manufacture,
            Total_Completed_Qty: filteredData[0].Total_Completed_Qty,
            WorkOrder: filteredData[0].WorkOrder,
            Workstation:
              filteredData[0].Workstation,
            Color: "#4FC0D0"
          };
          console.log({ eventData })
          setNewSourceData([...newSourceData, eventData]);
          scheduleObj.current.addEvent(eventData, 'Add');
          // scheduleObj.current.openEditor(eventData, 'Add', true);

          isTreeItemDropped = true;
          draggedItemId = event.draggedNodeData.id;
        }
      }
    }
    document.body.classList.remove("e-disble-not-allowed");
  };
  const onTreeDragStart = () => {
    document.body.classList.add("e-disble-not-allowed");
  };

  const headerTemplate = (props) => {
    console.log({ props });
    return (
      <div className="quick-info-header" style={{ padding: "10px", background: props.Color }}>
        {props.elementType === "event" && <div class="e-header-icon-wrapper">
          {/* <button
            className="e-edit e-control e-btn e-lib e-flat e-round e-small e-icon-btn"
            title="Edit"
            id="more-details"
            onClick={buttonClickActions}
          >
            <span className="e-btn-icon e-icons e-edit-icon"></span>
          </button> */}

          <ButtonComponent
            id="delete"
            cssClass="e-flat"
            content="Delete"
            onClick={buttonClickActions}
            isPrimary
          />
          {/* <ButtonComponent
            id="more-details"
            cssClass="e-flat"
            content="More Details"
            isPrimary={true}
            onClick={buttonClickActions}
          /> */}
          {/* <button
            className="e-delete e-control e-btn e-lib e-flat e-round e-small e-icon-btn"
            title="Delete"
            id="delete"
            onClick={buttonClickActions}
          >
            <span className="e-btn-icon e-icons e-delete-icon"></span>
          </button>
          <button
            className="e-close e-control e-btn e-lib e-flat e-round e-small e-icon-btn"
            title="Close"
            onClick={() => scheduleObj.current.closeQuickInfoPopup()}
          >
            <span className="e-btn-icon e-icons e-close-icon"></span>
          </button> */}
        </div>}
        <div
          className="quick-info-header-content"
          style={getHeaderStyles(props)}
        >
          <div className="quick-info-title">{props.Operation}</div>
          <div className="duration-text">{props.WorkOrder}</div>
        </div>
      </div>
    );
  };
  const contentTemplate = (props) => {
    console.log({ props })
    return (
      <div className="quick-info-content">
        {props.elementType === "cell" ? (
          <div className="e-cell-content">
            <div className="content-area">
              <TextBoxComponent id="title" ref={titleObj} placeholder="Title" />
            </div>
            <div className="content-area">
              <DropDownListComponent
                id="eventType"
                ref={eventTypeObj}
                fields={fields}
                dataSource={dataSource.plannerData}
                placeholder="Choose Type"
                index={0}
                popupHeight="200px"
              />
            </div>
            <div className="content-area">
              <TextBoxComponent id="notes" ref={notesObj} placeholder="Notes" />
            </div>
          </div>
        ) : (
          <div className="event-content">
            <div className="meeting-type-wrap">
              <label>Time </label>:<span> {moment(props.StartTime).format('LLL') + " - " + moment(props.EndTime).format('LLL')}</span>
            </div>



            <div className="notes-wrap">
              <label>Production Item</label>:<span> {props.Production_Item}</span>
            </div>
            <div className="notes-wrap">
              <label>Total Quantity</label>:<span> {props.for_quantity}</span>
            </div>
            <div className="notes-wrap">
              <label>Total Completed Qty</label>:<span> {props.Total_Completed_Qty}</span>
            </div>
            <div className="notes-wrap">
              <label>Workstation</label>:<span> {props.Workstation}</span>
            </div>
            <div className="notes-wrap">
              <label>Completed</label>:<span> {props.Completed}</span>
            </div>
            <div className="notes-wrap">
              <label>Remaining</label>:<span> {props.Remaining}</span>
            </div>
            <div className="notes-wrap">
              <label>Name</label>:<span> {props.Name}</span>
            </div>
            <div className="notes-wrap">
              <label>Operation Time Per 100 Unit</label>:<span> {props.Operation_Time_Per_100_Unit}</span>
            </div>
            <div className="notes-wrap">
              <label>Time In Minutes For Job</label>:<span> {Math.trunc(props.Time_In_Minutes_For_Job)}</span>
            </div>
          </div>
        )}
      </div>
    );
  };
  const footerTemplate = (props) => {
    console.log(props.elementType);
    return (
      <div className="quick-info-footer">
        {props.elementType === "cell" ? (
          <div className="cell-footer">
            <ButtonComponent
              id="more-details"
              cssClass="e-flat"
              content="More Details"
              onClick={buttonClickActions}
            />
            <ButtonComponent
              id="add"
              cssClass="e-flat"
              content="Add"
              isPrimary={true}
              onClick={buttonClickActions}
            />
          </div>
        ) : (
          <div className="event-footer">
            <ButtonComponent
              id="delete"
              cssClass="e-flat"
              content="Delete"
              onClick={buttonClickActions}
            />
            <ButtonComponent
              id="more-details"
              cssClass="e-flat"
              content="More Details"
              isPrimary={true}
              onClick={buttonClickActions}
            />
          </div>
        )}
      </div>
    );
  };
  const quickInfoTemplates = {
    header: headerTemplate,
    content: contentTemplate,
    footer: footerTemplate,
  };
  const getResourceData = (data) => {
    console.log({ data });
    const resources = scheduleObj.current.getResourceCollections().slice(-1)[0];
    console.log({ resources });
    const resourceData = resources.dataSource.filter(
      (resource, i) => resource.dataSource[i].Id === data.Workstations
    );
    console.log({ resourceData });
    return resourceData;
  };
  const getHeaderStyles = (data) => {
    if (data.elementType === "cell") {
      return { alignItems: "center", color: "#919191" };
    } else {
      // const resourceData = getResourceData(data);
      return { background: "#0000000", color: "#FFFFFF" };
    }
  };
  const getHeaderTitle = (data) => {
    return data.elementType === "cell"
      ? "Add Appointment"
      : "Appointment Details";
  };
  const getHeaderDetails = (data) => {
    return (
      intl.formatDate(data.startTime, { type: "date", skeleton: "full" }) +
      " (" +
      intl.formatDate(data.startTime, { skeleton: "hm" }) +
      " - " +
      intl.formatDate(data.endTime, { skeleton: "hm" }) +
      ")"
    );
  };


  const getEventType = (data) => {
    console.log({ data });
    const resourceData = getResourceData(data);
    // return resourceData.subject;
  };
  const buttonClickActions = (e) => {
    const quickPopup = scheduleObj.current.element.querySelector(
      ".e-quick-popup-wrapper"
    );
    console.log({ quickPopup });
    const getSlotData = () => {
      const cellDetails = scheduleObj.current.getCellDetails(
        scheduleObj.current.getSelectedElements()
      );


      let resourceDetails = scheduleObj.current.getResourcesByIndex(
        cellDetails.groupIndex
      );
      console.log({ cellDetails });
      console.log({ resourceDetails });

      const addObj = {
        Id: cellDetails.id,
        subject: titleObj.current.value,
        startTime: new Date(+cellDetails.startTime),
        endTime: new Date(+cellDetails.endTime),
        // IsAllDay: cellData.isAllDay,


        // Operation: filteredData[0].Operation,
        // Start_Time: filteredData[0].Start_Time,
        // End_Time: filteredData[0].End_Time,

        // Start_Time: moment(moment(moment(new Date()).format('L') + ' ' + filteredData[0].Start_Time).format()).toDate(),
        // End_Time: moment(moment(moment(new Date()).format('L') + ' ' + filteredData[0].End_Time).format()).toDate(),
        IsAllDay: cellDetails.isAllDay,
        Workstations: resourceDetails.resourceData.GroupId,
        description: "testing",
        Start_Time: cellDetails.startTime,
        End_Time: cellDetails.endTime,
        StartTime: cellDetails.startTime,
        EndTime: cellDetails.endTime,

      };

      return addObj;
    };
    if (e.target.id === "add") {
      const addObj = getSlotData();
      console.log({ addObj })
      scheduleObj.current.addEvent(addObj);
    } else if (e.target.id === "delete") {
      const eventDetails = scheduleObj.current.activeEventData.event;
      console.log({ eventDetails })
      let currentAction = "Delete";
      if (eventDetails.RecurrenceRule) {
        currentAction = "DeleteOccurrence";
      }
      const newData = newSourceData.filter((item) => item.Name !== eventDetails.Name);
      setNewSourceData(newData)
      scheduleObj.current.deleteEvent(eventDetails, currentAction);
    } else {
      const isCellPopup =
        quickPopup.firstElementChild.classList.contains("e-cell-popup");
      const eventDetails = isCellPopup
        ? getSlotData()
        : scheduleObj.current.activeEventData.event;
      console.log({ eventDetails })
      let currentAction = isCellPopup ? "Add" : "Add";
      if (eventDetails.RecurrenceRule) {
        currentAction = "EditOccurrence";
      }
      console.log({ currentAction })
      scheduleObj.current.openEditor(eventDetails, currentAction, true);
    }
    scheduleObj.current.closeQuickInfoPopup();
  };

  const onEventRendered = (args) => {
    args.element.style.height = "fit-content";

    // args.element.style.width = "80px";
    // console.log({args})
  }

  const editorTemplate = (props) => {
    // console.log({ props });
    return (props !== undefined ? <table className="custom-event-editor" style={{}}><tbody>
      <tr><td className="e-textlabel">Subject</td><td colSpan={4}>
        <input id="Summary" className="e-field e-input" type="text" name="subject" value={props.Operation || null} style={{}} />
      </td></tr>
      {/* <tr><td className="e-textlabel">Choose soubject</td><td colSpan={4}>
        <DropDownListComponent id="EventType" fields={fields}
          dataSource={dataSource.plannerData} placeholder='Choose status' data-name="EventType" className="e-field" style={{}} value={props.Operation || null}></DropDownListComponent>
      </td></tr> */}
      <tr><td className="e-textlabel">From</td><td colSpan={4}>
        <DateTimePickerComponent format='dd/MM/yy hh:mm a' id="StartTime" data-name="startTime" value={new Date(props.Start_Time || props.StartTime)} className="e-field"></DateTimePickerComponent>
      </td></tr>
      <tr><td className="e-textlabel">To</td><td colSpan={4}>
        <DateTimePickerComponent format='dd/MM/yy hh:mm a' id="EndTime" data-name="endTime" value={new Date(props.End_Time || props.EndTime)} className="e-field"></DateTimePickerComponent>
      </td></tr>
      <tr><td className="e-textlabel">Reason</td><td colSpan={4}>
        <textarea id="Description" className="e-field e-input" name="description" value={props.description || null} rows={3} cols={50} style={{}}></textarea>
      </td></tr></tbody></table> : <div></div>);
  }

  let selectedTarget;
  const menuItems = React.useMemo(() => [{
    text: 'New Event',
    iconCss: 'e-icons new',
    id: 'Add'
  }, {
    text: 'New Recurring Event',
    iconCss: 'e-icons recurrence',
    id: 'AddRecurrence'
  }, {
    text: 'Today',
    iconCss: 'e-icons today',
    id: 'Today'
  }, {
    text: 'Edit Event',
    iconCss: 'e-icons edit',
    id: 'Save'
  }, {
    text: 'Edit Event',
    id: 'EditRecurrenceEvent',
    iconCss: 'e-icons edit',
    items: [{
      text: 'Edit Occurrence',
      id: 'EditOccurrence'
    }, {
      text: 'Edit Series',
      id: 'EditSeries'
    }]
  }, {
    text: 'Delete Event',
    iconCss: 'e-icons delete',
    id: 'Delete'
  }, {
    text: 'Delete Event',
    id: 'DeleteRecurrenceEvent',
    iconCss: 'e-icons delete',
    items: [{
      text: 'Delete Occurrence',
      id: 'DeleteOccurrence'
    }, {
      text: 'Delete Series',
      id: 'DeleteSeries'
    }]
  }
  ], [])


  const onMenuItemSelect = (args) => {
    let selectedMenuItem = args.item.id;
    console.log({ args })
    if (selectedTarget && selectedTarget.classList.contains('e-appointment')) {
      setEventObj(scheduleObj.current.getEventDetails(selectedTarget));
    }
    // eslint-disable-next-line default-case
    switch (selectedMenuItem) {
      case 'Today':
        scheduleObj.current.selectedDate = new Date();
        break;
      case 'Add':
      case 'AddRecurrence':
        let selectedCells = scheduleObj.current.getSelectedElements();
        let activeCellsData = scheduleObj.current.getCellDetails(selectedCells.length > 0 ? selectedCells : selectedTarget);
        if (selectedMenuItem === 'Add') {
          scheduleObj.current.openEditor(activeCellsData, 'Add');
        } else {
          scheduleObj.current.openEditor(activeCellsData, 'Add', null, 1);
        }
        break;
      case 'Save':
      case 'EditOccurrence':
      case 'EditSeries':
        if (selectedMenuItem === 'EditSeries') {
          setEventObj(new DataManager(scheduleObj.current.eventsData).executeLocal(
            new Query().where(scheduleObj.current.eventFields.id,
              'equal', eventObj[scheduleObj.current.eventFields.recurrenceID][0])));
        }
        scheduleObj.current.openEditor(eventObj, selectedMenuItem);
        break;
      case 'Delete':
        scheduleObj.current.deleteEvent(eventObj);
        break;
      case 'DeleteOccurrence':
      case 'DeleteSeries':
        scheduleObj.current.deleteEvent(eventObj, selectedMenuItem);
        break;
    }
  }
  const menuObj = useRef(null);
  const [eventObj, setEventObj] = React.useState(null);
  // const onContextMenuBeforeOpen = (args) => {
  //   let newEventElement = document.querySelector('.e-new-event');
  //   if (newEventElement) {
  //     remove(newEventElement);
  //     removeClass([document.querySelector('.e-selected-cell')], 'e-selected-cell');
  //   }
  //   scheduleObj.current.closeQuickInfoPopup();
  //   let targetElement = args.event.target;
  //   if (closest(targetElement, '.e-contextmenu')) {
  //     return;
  //   }
  //   selectedTarget = closest(targetElement, '.e-appointment,.e-work-cells,' +
  //     '.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells');
  //   if (isNullOrUndefined(selectedTarget)) {
  //     args.cancel = true;
  //     return;
  //   }
  //   if (selectedTarget.classList.contains('e-appointment')) {
  //     setEventObj(scheduleObj.current.getEventDetails(selectedTarget));
  //     return;
  //   }
  //   menuObj.current.hideItems(['Save', 'Delete', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
  //   menuObj.current.showItems(['Add', 'AddRecurrence', 'Today'], true);
  // }
  // useEffect(() => {
  //   if (eventObj && eventObj.RecurrenceRule) {
  //     menuObj.current.showItems(['EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
  //     menuObj.current.hideItems(['Add', 'AddRecurrence', 'Today', 'Save', 'Delete'], true);
  //   } else {
  //     menuObj.current.showItems(['Save', 'Delete'], true);
  //     menuObj.current.hideItems(['Add', 'AddRecurrence', 'Today', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
  //   }
  // }, [eventObj]);
  const eventTemplate = (props) => {
    // console.log({ props })
    // console.log(props.Completed)
    return (<div className="template-wrap" style={{ background: props.Color }}>
      <div className="subject" style={{ background: props.primaryColor }}>{props.Operation}</div>
      <div className="time" style={{ background: props.primaryColor }}> {props.WorkOrder}</div>
      {/* <div className="image">
        <img src={"https://ej2.syncfusion.com/react/demos/src/schedule/images/" + props.imageName + ".svg"} alt={props.imageName} />
      </div> */}
      <div className="event-description parent">
        <div class="child child-1" style={{ background: "#5C8374", width: `${props.Remaining}%` }}>{Math.trunc(props.Remaining)} </div>
        <div class="child child-2" style={{ background: "#93B1A6", width: `${props.Completed}%`, padding: "1px" }}> {Math.trunc(props.Completed)} </div>
      </div>
    </div>);
  };
  const handleCellClick = (args) => {
    // Prevent the default cell click behavior
    args.cancel = true;
  };
  const { isOpen, onToggle, onClose } = useDisclosure()
  function handleResize(args) {
    console.log({ args })
    const newData = newSourceData.filter((item) => item.Name !== args.data.Name && item.Workstations !== args.data.Workstations);
    setNewSourceData([...newData, args.data])
  }
  return (
    <Box py={"20px"} bg={"#fff9ed"}>
      <Box mt="80px" mb={"20px"} height={"70px"} bg={"#fff9ed"} border="1px solid gray"
        borderColor={"rgba(0, 0, 0, 0.2)"} boxShadow="2px 2px 6px rgba(0, 0, 0, 0.1)">
        <Header />

      </Box>
      {/* <Box
        boxShadow="2px 2px 6px rgba(0, 0, 0, 0.1)"
        border="1px solid gray"
        borderColor={"rgba(0, 0, 0, 0.2)"}
        key="a"
        mb="40px"
      >
        <EmployeeProductivity />
      </Box> */}
      <div className="schedule-control-section" >
        <div className="col-lg-12 control-section mb-8">
          <div className="control-wrapper drag-sample-wrapper">
            <div className="schedule-container">
              <div className="title-container">
                <h1 className="title-text">Smart Planner</h1>
              </div>
              <ScheduleComponent
                cellClick={handleCellClick}
                cellDoubleClick={handleCellClick}
                resizeStop={handleResize}
                timeScale={{ enable: true, interval: 40, slotCount: 2 }}
                cellHeight="20px"
                cellWidth="50px"
                editorTemplate={editorTemplate}
                quickInfoTemplates={quickInfoTemplates}
                ref={scheduleObj}
                cssClass="schedule-drag-drop event-template custom-scheduler"
                width="100%"
                height="590px"
                selectedDate={new Date()}
                rowAutoHeight={true}
                eventRendered={onEventRendered}
                // resourceHeaderTemplate={resourceHeaderTemplate} 
                currentView="TimelineDay"
                // eventSettings={
                //   {
                //     dataSource: dataSource.plannerData,
                //     fields: {
                //       subject: { title: 'Patient Name', name: 'Operation' },
                //       startTime: { title: "From", name: "Start_Time" },
                //       endTime: { title: "To", name: "End_Time" },
                //       description: { title: 'Reason', name: 'Description' }
                //     },
                //     template: eventTemplate
                //   }
                // }
                eventSettings={{
                  dataSource: [
                    // {
                    //   Column1: 2,
                    //   ID: "PO-JOB00022",
                    //   WorkOrder: "MFG-WO-2023-00001",
                    //   Operation: "FACING",
                    //   Workstation: "NAVTECH FACING",
                    //   Production_Item: "SHAFT 14P HS BEE",
                    //   Qty_To_Manufacture: 50000,
                    //   Total_Completed_Qty: 2500,
                    //   Operation_Time_per_100_Unit: 6,

                    //   Start_Time: "Sun Aug 27 2023 01:20:00 GMT+0530",
                    //   End_Time: "Sun Aug 27 2023 01:30:00 GMT+0530",
                    //   Workstations: 2,

                    // },
                    // {
                    //   Operation: "TURNING",
                    //   IsAllDay: false,
                    //   Workstations: 1,
                    //   description: "testing",
                    //   startTime: "2023-08-26T19:30:00.000Z",
                    //   endTime: "2023-08-26T19:40:00.000Z",
                    //   Start_Time: "2023-08-26T19:30:00.000Z",
                    //   End_Time: "2023-08-26T19:40:00.000Z",
                    //   StartTime: "2023-08-26T19:30:00.000Z",
                    //   EndTime: "2023-08-26T19:40:00.000Z",
                    //   Column1: 5,
                    //   ID: "PO-JOB00025",
                    //   Operation_Time_per_100_Unit: 8,
                    //   Production_Item: "SHAFT 14P HS BEE",
                    //   Qty_To_Manufacture: 50000,
                    //   Total_Completed_Qty: 2000,
                    //   WorkOrder: "MFG-WO-2023-00001",
                    //   Workstation: "GURJIT TURNIGN 1",
                    // }
                    // , ...dataSource.plannerData
                    ...newSourceData
                  ],
                  template: eventTemplate,
                  fields: { subject: { title: 'Name', name: 'Operation' }, startTime: { title: "From", name: "StartTime" }, endTime: { title: "To", name: "EndTime" }, description: { title: 'Reason', name: 'description' } }
                }}
                group={{ enableCompactView: true, resources: ["Workstations"] }}
                actionBegin={onActionBegin}
              >
                <ResourcesDirective>
                  {/* <ResourceDirective field='DepartmentID' title='Department' name='Departments' allowMultiple={false} dataSource={departmentData} textField='Text' idField='Id' colorField='Color' /> */}
                  <ResourceDirective
                    field="Workstations"
                    title="Workstations"
                    name="Workstations"
                    allowMultiple={false}
                    dataSource={plannerHeaders}
                    textField="Text"
                    idField="Id"
                    groupIDField="GroupId"
                    colorField="Color"
                  />
                </ResourcesDirective>
                <ViewsDirective>
                  <ViewDirective option="TimelineDay"
                  // eventTemplate={eventTemplate}
                  />
                  <ViewDirective option="TimelineMonth" />
                </ViewsDirective>
                <Inject
                  services={[TimelineViews, TimelineMonth, Resize, DragAndDrop]}
                />
              </ScheduleComponent>
            </div>
            <div className="treeview-container">
              <div className="title-container">
                <h1 className="title-text">Job List</h1>
                <Flex justify="flex-end" alignItems="center" border={"1px solid #ddd"} mt="14px" py="6px" px="5px" >
                  <Box mr="5" border={"1px solid #ddd"} py={"1"} px={'5'}>
                    <IconButton
                      icon={<FiFilter />}
                      aria-label="Filter"
                    />
                  </Box>
                  <Box mr="5" border={"1px solid #ddd"} py={"1"} px={'5'}>
                    <IconButton
                      icon={<LuFilterX />}
                      aria-label="Sort"
                    />
                  </Box>
                  <Box border={"1px solid #ddd"} py={"1"} px={'5'}>
                    <IconButton
                      icon={<BsSortDown />}
                      aria-label="Sort"
                    // onClick={onToggle}
                    />
                  </Box>
                </Flex>
                <div class="table-heading">
                  <div class="table-heading-cell">Job Card</div>
                  <div class="table-heading-cell">Operation</div>
                  <div class="table-heading-cell">Quantity</div>
                </div>
              </div>
              <TreeViewComponent
                ref={treeObj}
                cssClass="treeview-external-drag"
                dragArea=".drag-sample-wrapper"
                nodeTemplate={treeTemplate}
                fields={fields}
                nodeDragStop={onTreeDragStop}
                nodeSelecting={onItemSelecting}
                nodeDragging={onTreeDrag}
                nodeDragStart={onTreeDragStart}
                allowDragAndDrop={allowDragAndDrops}
              />
            </div>

            {/* <ContextMenuComponent cssClass='schedule-context-menu' ref={menuObj} target='.e-schedule' items={menuItems} beforeOpen={onContextMenuBeforeOpen} select={onMenuItemSelect} /> */}
          </div>

        </div>
        {/* <Popover isOpen={isOpen}>
        <PopoverTrigger>
          <button>Open Popover</button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Flex direction="column">
              <Select mb={2}>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </Select>
              <Select mb={2}>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </Select>
              <Select>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </Select>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover> */}
      </div>
    </Box>
  );
};
export default App;


