import { useGetStructure } from "@/hooks/useGetStructure";
import type { IStructureItem } from "@/interfaces/IStructureItem";
import { StructureItem } from "../StructureItem/StructureItem";
import styles from "./Structure.module.css";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@mui/material";
import { Auth } from "@/Store/Auth.store";
import { Paths } from "@/enums/Paths";
import { useNavigate } from "react-router-dom";


const Structure: React.FC = () => {
    const { structure, setStructure } = useGetStructure()
    const currentUser = useAuth();
    const { logout } = Auth;
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate(Paths.Login)
    }

    const toggleExpand = (id: string) => {
        const updateStructure = (structure: IStructureItem[]): IStructureItem[] => {
            return structure.map((item) => {
                if (item.id === id) {
                    return { ...item, expanded: !item.expanded };
                }
                if (item.children.length > 0) {
                    item.children = updateStructure(item.children);
                }
                return item;
            });
        };
        setStructure(updateStructure(structure));
    };

    return (
        <div className={styles.container}>
            <div>
                {structure.map((book) => (
                    <StructureItem
                        key={book.id}
                        item={book}
                        onToggleExpand={toggleExpand}
                    />
                ))}
            </div>
            <div className={styles.welcomeBlock}>Welcome {currentUser}! <Button variant="text" onClick={handleLogout}>Logout</Button></div>
        </div>
    );
};

export default Structure;
