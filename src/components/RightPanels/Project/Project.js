import { Button, IconButton, Tooltip } from "@chakra-ui/react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  DELETE_PROJECT,
  PROJECTS,
  SET_DEFAULT_PROJECT_BY_ID,
} from "../../../store/actions/project";
import PageTitle from "../../common/PageTitle";
import Surface from "../../common/Surface";
import Processing from "../../Processing";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    backgroundColor: "black",
  },
  row: {
    color: "white",
  },
});
const Project = () => {
  const allProject = useSelector((state) => state.Project.allProject);
  const defaultProject = useSelector((state) => state.Project.default);
  const [model, setModel] = useState(false);
  const [title, setTitle] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <div style={{ margin: 20 }}>
      <PageTitle name="My Projects" />
      <Surface my={5}>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.header}>
              <TableRow>
                <TableCell className={classes.row}>Id</TableCell>
                <TableCell className={classes.row}>Title</TableCell>
                <TableCell className={classes.row}>Keyword</TableCell>
                <TableCell className={classes.row} align="right">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allProject.map((row, i) => (
                <TableRow key={i}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.row}
                    onClick={() => {
                      history.push("/dashboard", { config: row });
                    }}
                  >
                    {row.id}
                  </TableCell>
                  <TableCell
                    className={classes.row}
                    onClick={() => {
                      history.push("/dashboard", { config: row });
                    }}
                  >
                    {row.title}
                  </TableCell>
                  <TableCell
                    className={classes.row}
                    onClick={() => {
                      history.push("/dashboard", { config: row });
                    }}
                  >
                    {row.keyword}
                  </TableCell>
                  <TableCell className={classes.row} align="right">
                    {defaultProject ? (
                      row.id !== defaultProject.id && (
                        <Tooltip hasArrow label="Set Default" color="white">
                          <Button
                            variant="solid"
                            colorScheme="blue"
                            onClick={() => {
                              setModel(true);
                              setTitle("Setting default project");
                              dispatch(
                                SET_DEFAULT_PROJECT_BY_ID(row, () => {
                                  setModel(false);
                                })
                              );
                            }}
                          >
                            Set Default
                          </Button>
                        </Tooltip>
                      )
                    ) : (
                      <Tooltip hasArrow label="Set Default" color="white">
                        <Button
                          variant="solid"
                          colorScheme="blue"
                          onClick={() => {
                            setModel(true);
                            setTitle("Setting default project");
                            dispatch(
                              SET_DEFAULT_PROJECT_BY_ID(row, () => {
                                setModel(false);
                              })
                            );
                          }}
                        >
                          Set Default
                        </Button>
                      </Tooltip>
                    )}
                    <Tooltip hasArrow label="Delete Project" color="white">
                      <IconButton
                        mx={4}
                        variant="ghost"
                        colorScheme="red"
                        aria-label="facebook"
                        onClick={() => {
                          setModel(true);
                          setTitle("Deleting Project");
                          dispatch(
                            DELETE_PROJECT(
                              row.id,
                              () => {
                                setModel(false);
                                let a = [...allProject];
                                a = a.filter(
                                  (project) => project.id !== row.id
                                );
                                dispatch(PROJECTS(a));
                              },
                              () => {
                                setModel(false);
                              }
                            )
                          );
                        }}
                        icon={<FaTrash />}
                      />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Processing visible={model} title={title} />
      </Surface>
    </div>
  );
};

export default Project;
