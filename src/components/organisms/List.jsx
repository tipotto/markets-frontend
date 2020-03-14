import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import { createStyles, makeStyles } from "@material-ui/styles";
import { requestFetch, requestDelete } from "../../actions";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

const useStyles = makeStyles(Theme =>
  createStyles({
    button: {
      margin: 15
    }
  })
);

const List = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const items = useSelector(state => state.itemReducer.items);

  useEffect(() => {
    console.log("マウントを実行しました。");
    dispatch(requestFetch());
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>ID</TableHeaderColumn>
          <TableHeaderColumn>Title</TableHeaderColumn>
          <TableHeaderColumn>Description</TableHeaderColumn>
          <TableHeaderColumn></TableHeaderColumn>
          <TableHeaderColumn></TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => {
          return (
            <TableRow>
              <TableRowColumn>{item.id}</TableRowColumn>
              <TableRowColumn>{item.title}</TableRowColumn>
              <TableRowColumn>{item.description}</TableRowColumn>
              <TableRowColumn>
                <RaisedButton className={classes.button} label="Modify" />
              </TableRowColumn>
              <TableRowColumn>
                <RaisedButton
                  className={classes.button}
                  label="Delete"
                  secondary={true}
                  onClick={() => dispatch(requestDelete(item.id))}
                />
              </TableRowColumn>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default List;
